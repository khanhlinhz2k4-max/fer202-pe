import { cn as cnHelper } from "cn";

export function cn(...inputs: any[]) {
  return cnHelper(...inputs);
}

/**
 * Formats a numeric amount to $XX.XX with exactly two decimal places and NO thousands separator
 * Examples: 12.5 -> "$12.50", 1234 -> "$1234.00", 0 -> "$0.00"
 */
export function formatCurrency(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "$0.00";
  return `$${num.toFixed(2)}`;
}

/**
 * Formats a date to YYYY-MM-DD
 */
export function formatDate(dateStr: string | Date): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
