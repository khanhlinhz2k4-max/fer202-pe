"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageContainer } from "@/components/common/page-container";
import { ItemForm } from "@/components/crud/item-form";
import { ItemList } from "@/components/crud/item-list";
import { ItemFilters } from "@/components/crud/item-filters";
import { ItemSummary } from "@/components/crud/item-summary";

export default function BooksPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  // Protected route - zero flash while verifying authentication
  if (isLoading || !user) {
    return null;
  }

  return (
    <div
      data-testid="books-page"
      className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden"
    >
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <PageContainer>
          <div className="flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/50 pb-6">
              <div>
                <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">
                  My Bookshelf
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Track the books you want to read, are reading, or have finished.
                </p>
              </div>
            </div>

            {/* Summary Metrics */}
            <ItemSummary />

            {/* Main Content Layout: Form (Left) & Filter/List (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1 lg:sticky lg:top-24">
                <ItemForm />
              </div>

              <div className="lg:col-span-2 flex flex-col gap-6">
                <ItemFilters />
                <ItemList />
              </div>
            </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}

