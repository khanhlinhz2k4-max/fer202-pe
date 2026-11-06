"use client";

import * as React from "react";
import { useData } from "@/contexts/data-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BookStatus } from "@/types";

const STATUS_OPTIONS: BookStatus[] = ["To Read", "Reading", "Finished"];

export function ItemFilters() {
  const {
    statusFilter,
    searchQuery,
    setStatusFilter,
    setSearchQuery,
    clearFilters,
  } = useData();

  return (
    <div className="flex flex-wrap items-end gap-3 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-xs shadow-xs">
      {/* Status Filter */}
      <div className="flex flex-col gap-1.5 min-w-[150px]">
        <Label htmlFor="filter-status" className="text-xs">
          Status
        </Label>
        <select
          id="filter-status"
          data-testid="filter-status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 w-full rounded-lg border border-input bg-[#FDF9F0] px-3 py-1 text-xs sm:text-sm text-foreground shadow-xs transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">All</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
        <Label htmlFor="search-input" className="text-xs">
          Search
        </Label>
        <Input
          id="search-input"
          data-testid="search-input"
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 text-xs sm:text-sm"
        />
      </div>

      {/* Clear Button */}
      <Button
        type="button"
        variant="outline"
        size="default"
        data-testid="btn-clear-filters"
        onClick={clearFilters}
        className="h-9"
      >
        Clear
      </Button>
    </div>
  );
}
