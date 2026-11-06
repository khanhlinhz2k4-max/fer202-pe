"use client";

import * as React from "react";
import { useData } from "@/contexts/data-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BookStatus } from "@/types";

const STATUS_OPTIONS: BookStatus[] = ["To Read", "Reading", "Finished"];

export function ItemForm() {
  const { addBook } = useData();

  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [pages, setPages] = React.useState("");
  const [status, setStatus] = React.useState("");

  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [errorTitle, setErrorTitle] = React.useState("");
  const [errorAuthor, setErrorAuthor] = React.useState("");
  const [errorPage, setErrorPage] = React.useState("");
  const [errorStatus, setErrorStatus] = React.useState("");
  const [errorBook, setErrorBook] = React.useState("");
  const [bookSuccess, setBookSuccess] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateTitle = (val: string) => {
    if (!val.trim()) {
      return "Title is required";
    }
    if (val.trim().length > 80 || val.length > 80) {
      return "Title must be at most 80 characters";
    }
    return "";
  };

  const validateAuthor = (val: string) => {
    if (!val.trim()) {
      return "Author is required";
    }
    if (val.trim().length > 60 || val.length > 60) {
      return "Author must be at most 60 characters";
    }
    return "";
  };

  const validatePages = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Page is required";
    }
    const num = Number(trimmed);
    if (!/^-?\d+$/.test(trimmed) || !Number.isInteger(num) || num < 1 || num > 5000) {
      return "Page must be a whole number between 1 and 5000";
    }
    return "";
  };

  const validateStatus = (val: string) => {
    if (!val || !STATUS_OPTIONS.includes(val as BookStatus)) {
      return "Please choose a status";
    }
    return "";
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (hasSubmitted) {
      setErrorTitle(validateTitle(val));
    }
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAuthor(val);
    if (hasSubmitted) {
      setErrorAuthor(validateAuthor(val));
    }
  };

  const handlePagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPages(val);
    if (hasSubmitted) {
      setErrorPage(validatePages(val));
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setStatus(val);
    if (hasSubmitted) {
      setErrorStatus(validateStatus(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    setErrorBook("");
    setBookSuccess("");

    const eTitle = validateTitle(title);
    const eAuthor = validateAuthor(author);
    const ePage = validatePages(pages);
    const eStatus = validateStatus(status);

    setErrorTitle(eTitle);
    setErrorAuthor(eAuthor);
    setErrorPage(ePage);
    setErrorStatus(eStatus);

    if (eTitle || eAuthor || ePage || eStatus) {
      return;
    }

    setIsSubmitting(true);
    const result = await addBook({
      title: title.trim(),
      author: author.trim(),
      pages: Number(pages.trim()),
      status: status as BookStatus,
    });
    setIsSubmitting(false);

    if (result.error) {
      setErrorBook(result.error.message);
    } else {
      setTitle("");
      setAuthor("");
      setPages("");
      setStatus("");
      setHasSubmitted(false);
      setErrorTitle("");
      setErrorAuthor("");
      setErrorPage("");
      setErrorStatus("");
      setBookSuccess("Book added");
    }
  };

  return (
    <Card className="bg-card border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-heading font-semibold text-foreground">
          Add a Book
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div data-testid="books-form" className="contents">
          <form
            data-testid="expense-form"
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {errorBook && (
              <div
                data-testid="error-book"
                className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm font-medium text-destructive"
              >
                {errorBook}
              </div>
            )}

            {bookSuccess && (
              <div
                data-testid="book-success"
                className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm font-medium text-primary"
              >
                {bookSuccess}
              </div>
            )}

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="input-title">Title</Label>
              <Input
                id="input-title"
                data-testid="input-title"
                type="text"
                placeholder="e.g. The Pragmatic Programmer"
                value={title}
                onChange={handleTitleChange}
                aria-invalid={!!errorTitle}
              />
              {errorTitle && (
                <span data-testid="error-title" className="text-xs font-medium text-destructive">
                  {errorTitle}
                </span>
              )}
            </div>

            {/* Author */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="input-author">Author</Label>
              <Input
                id="input-author"
                data-testid="input-author"
                type="text"
                placeholder="e.g. Andrew Hunt"
                value={author}
                onChange={handleAuthorChange}
                aria-invalid={!!errorAuthor}
              />
              {errorAuthor && (
                <span data-testid="error-author" className="text-xs font-medium text-destructive">
                  {errorAuthor}
                </span>
              )}
            </div>

            {/* Number of Pages */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="input-pages">Pages</Label>
              <Input
                id="input-pages"
                data-testid="input-pages"
                type="number"
                placeholder="e.g. 320"
                value={pages}
                onChange={handlePagesChange}
                aria-invalid={!!errorPage}
              />
              {errorPage && (
                <span data-testid="error-page" className="text-xs font-medium text-destructive">
                  {errorPage}
                </span>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="select-status">Status</Label>
              <select
                id="select-status"
                data-testid="select-status"
                value={status}
                onChange={handleStatusChange}
                aria-invalid={!!errorStatus}
                className="h-9 w-full rounded-lg border border-input bg-[#FDF9F0] px-3 py-1 text-sm text-foreground shadow-xs transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Choose status</option>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errorStatus && (
                <span data-testid="error-status" className="text-xs font-medium text-destructive">
                  {errorStatus}
                </span>
              )}
            </div>

            <Button
              type="submit"
              data-testid="btn-add-book"
              className="w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Add Book"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
