export type BookStatus = "To Read" | "Reading" | "Finished";

export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string;
  pages: number;
  status: BookStatus;
  created_at: string;
}

export interface StatusBreakdownItem {
  status: BookStatus;
  count: number;
}
