"use client";

import * as React from "react";
import { useData } from "@/contexts/data-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ItemList() {
  const { filteredBooks, advanceBookStatus, deleteBook, isLoading } = useData();

  if (isLoading && filteredBooks.length === 0) {
    return (
      <Card className="bg-card border-border/60 shadow-sm">
        <CardContent className="py-12 text-center text-sm text-muted-foreground">
          Loading books...
        </CardContent>
      </Card>
    );
  }

  // When there is nothing to show, display book-empty with "No books found" instead of the list
  if (filteredBooks.length === 0) {
    return (
      <div
        data-testid="books-empty"
        className="rounded-2xl border border-dashed border-border/80 bg-card/60 p-12 text-center text-muted-foreground font-medium"
      >
        <span data-testid="book-empty">No books found</span>
      </div>
    );
  }

  return (
    <Card className="bg-card border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-heading font-semibold text-foreground">
          Your Shelf
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div data-testid="book-list" className="flex flex-col gap-3">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              data-testid="book-item"
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border/40 bg-background/50 hover:bg-background/80 transition-colors gap-3"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    data-testid="book-status"
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider bg-secondary text-secondary-foreground"
                  >
                    {book.status}
                  </span>
                  <span
                    data-testid="book-pages"
                    className="text-xs text-muted-foreground font-mono"
                  >
                    {`${book.pages} pages`}
                  </span>
                </div>

                <div
                  data-testid="book-title"
                  className="font-semibold text-foreground text-base truncate max-w-md"
                >
                  {book.title}
                </div>

                <div
                  data-testid="book-author"
                  className="text-sm text-muted-foreground truncate max-w-md"
                >
                  {book.author}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 shrink-0">
                {book.status !== "Finished" && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    data-testid="btn-advance-status"
                    onClick={() => advanceBookStatus(book.id, book.status)}
                  >
                    Advance
                  </Button>
                )}

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  data-testid="btn-delete-book"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
