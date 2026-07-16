export const CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investments",
  "Gifts",
  "Other",
] as const;

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];

export interface FinanceRecord<C extends string> {
  id: string;
  date: string; // ISO date string, e.g. "2026-07-15"
  amount: number;
  category: C;
  description: string;
  createdAt: string; // ISO timestamp, used as a tiebreaker for sorting
}

export type RecordFormValues<C extends string> = {
  date: string;
  amount: string;
  category: C | "";
  description: string;
};

export type RecordFormErrors = Partial<Record<"date" | "amount" | "category" | "description", string>>;

export type Expense = FinanceRecord<Category>;
export type ExpenseFormValues = RecordFormValues<Category>;
export type ExpenseFormErrors = RecordFormErrors;

export type Income = FinanceRecord<IncomeCategory>;
export type IncomeFormValues = RecordFormValues<IncomeCategory>;
export type IncomeFormErrors = RecordFormErrors;
