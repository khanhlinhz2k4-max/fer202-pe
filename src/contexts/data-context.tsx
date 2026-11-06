"use client";

import * as React from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import type { Book, BookStatus, StatusBreakdownItem } from "@/types";

// Section 2.2: Primary table is `books` per ShelfLife exam requirements
const TABLE_NAME = "books";

interface DataContextType {
  books: Book[];
  filteredBooks: Book[];
  statusFilter: string;
  searchQuery: string;
  bookCount: number;
  totalPages: number;
  statusBreakdown: StatusBreakdownItem[];
  isLoading: boolean;
  setStatusFilter: (status: string) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  addBook: (data: {
    title: string;
    author: string;
    pages: number;
    status: BookStatus;
  }) => Promise<{ error: Error | null; data?: Book }>;
  advanceBookStatus: (id: string, currentStatus: BookStatus) => Promise<{ error: Error | null }>;
  deleteBook: (id: string) => Promise<{ error: Error | null }>;
}

const DataContext = React.createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [books, setBooks] = React.useState<Book[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Load books once after login; clear memory immediately on logout or user switch
  React.useEffect(() => {
    setBooks([]);
    setStatusFilter("");
    setSearchQuery("");

    if (!user) {
      return;
    }

    let isMounted = true;

    const fetchBooks = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (isMounted && !error && data) {
        setBooks(
          data.map((row) => ({
            id: row.id,
            user_id: row.user_id,
            title: row.title,
            author: row.author,
            pages: Number(row.pages),
            status: row.status as BookStatus,
            created_at: row.created_at,
          }))
        );
      }
      if (isMounted) {
        setIsLoading(false);
      }
    };

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Combined filter (status + case-insensitive trimmed search on title or author)
  const filteredBooks = React.useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    return books.filter((book) => {
      if (statusFilter && book.status !== statusFilter) {
        return false;
      }
      if (trimmedQuery) {
        const matchesTitle = book.title.toLowerCase().includes(trimmedQuery);
        const matchesAuthor = book.author.toLowerCase().includes(trimmedQuery);
        if (!matchesTitle && !matchesAuthor) {
          return false;
        }
      }
      return true;
    });
  }, [books, statusFilter, searchQuery]);

  // Summary metrics derived from currently shown books
  const { bookCount, totalPages, statusBreakdown } = React.useMemo(() => {
    let pagesSum = 0;
    const countsByStatus: Record<string, number> = {};

    filteredBooks.forEach((book) => {
      pagesSum += Number(book.pages) || 0;
      countsByStatus[book.status] = (countsByStatus[book.status] || 0) + 1;
    });

    const breakdown: StatusBreakdownItem[] = Object.entries(countsByStatus)
      .map(([status, count]) => ({
        status: status as BookStatus,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      bookCount: filteredBooks.length,
      totalPages: pagesSum,
      statusBreakdown: breakdown,
    };
  }, [filteredBooks]);

  const clearFilters = () => {
    setStatusFilter("");
    setSearchQuery("");
  };

  const addBook = async (data: {
    title: string;
    author: string;
    pages: number;
    status: BookStatus;
  }) => {
    if (!user) {
      return { error: new Error("User not authenticated") };
    }

    const payload = {
      user_id: user.id,
      title: data.title.trim(),
      author: data.author.trim(),
      pages: data.pages,
      status: data.status,
    };

    const { data: inserted, error } = await supabase
      .from(TABLE_NAME)
      .insert([payload])
      .select()
      .single();

    if (error) {
      return { error: new Error(error.message) };
    }

    const newBook: Book = {
      id: inserted.id,
      user_id: inserted.user_id,
      title: inserted.title,
      author: inserted.author,
      pages: Number(inserted.pages),
      status: inserted.status as BookStatus,
      created_at: inserted.created_at,
    };

    // Most recently added first
    setBooks((prev) => [newBook, ...prev]);
    return { error: null, data: newBook };
  };

  const advanceBookStatus = async (id: string, currentStatus: BookStatus) => {
    if (currentStatus === "Finished") {
      return { error: null };
    }

    const nextStatus: BookStatus =
      currentStatus === "To Read" ? "Reading" : "Finished";

    const { data: updated, error } = await supabase
      .from(TABLE_NAME)
      .update({ status: nextStatus })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { error: new Error(error.message) };
    }

    setBooks((prev) =>
      prev.map((book) =>
        book.id === id
          ? { ...book, status: (updated?.status as BookStatus) || nextStatus }
          : book
      )
    );

    return { error: null };
  };

  const deleteBook = async (id: string) => {
    const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
    if (error) {
      return { error: new Error(error.message) };
    }

    setBooks((prev) => prev.filter((book) => book.id !== id));
    return { error: null };
  };

  return (
    <DataContext.Provider
      value={{
        books,
        filteredBooks,
        statusFilter,
        searchQuery,
        bookCount,
        totalPages,
        statusBreakdown,
        isLoading,
        setStatusFilter,
        setSearchQuery,
        clearFilters,
        addBook,
        advanceBookStatus,
        deleteBook,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
