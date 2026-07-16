export const CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Expense {
  id: string;
  date: string; // ISO date string, e.g. "2026-07-15"
  amount: number;
  category: Category;
  description: string;
  createdAt: string; // ISO timestamp, used as a tiebreaker for sorting
}

export type ExpenseFormValues = {
  date: string;
  amount: string;
  category: Category | "";
  description: string;
};

export type ExpenseFormErrors = Partial<Record<keyof ExpenseFormValues, string>>;
