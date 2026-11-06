"use client";

import * as React from "react";
import { useData } from "@/contexts/data-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ItemSummary() {
  const { bookCount, totalPages, statusBreakdown } = useData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      {/* Total Books */}
      <Card className="bg-card border-border/60 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Total Books
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            data-testid="book-amount"
            className="text-2xl sm:text-3xl font-bold font-mono text-foreground"
          >
            {bookCount}
          </div>
        </CardContent>
      </Card>

      {/* Total Pages */}
      <Card className="bg-card border-border/60 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Total Pages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            data-testid="total-pages"
            className="text-2xl sm:text-3xl font-bold font-mono text-accent"
          >
            {totalPages}
          </div>
        </CardContent>
      </Card>

      {/* Status Breakdown */}
      <Card className="bg-card border-border/60 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Status Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            data-testid="status-breakdown"
            className="flex flex-col gap-1.5 max-h-28 overflow-y-auto pr-1"
          >
            {statusBreakdown.length === 0 ? (
              <div className="text-xs text-muted-foreground">No books shown</div>
            ) : (
              statusBreakdown.map((item) => (
                <div
                  key={item.status}
                  data-testid="breakdown-row"
                  className="flex justify-between items-center text-xs sm:text-sm"
                >
                  <span data-testid="breakdown-name" className="font-medium text-foreground">
                    {item.status}
                  </span>
                  <span data-testid="breakdown-count" className="font-mono font-semibold text-muted-foreground">
                    {item.count}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
