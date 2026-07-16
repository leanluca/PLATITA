"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Expense } from "@/lib/types";
import { loadExpenses, saveExpenses } from "@/lib/storage";
import { generateId } from "@/lib/utils";

interface ExpenseContextValue {
  expenses: Expense[];
  loading: boolean;
  addExpense: (expense: Omit<Expense, "id" | "createdAt">) => void;
  updateExpense: (id: string, expense: Omit<Expense, "id" | "createdAt">) => void;
  deleteExpense: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setExpenses(loadExpenses());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) saveExpenses(expenses);
  }, [expenses, loading]);

  const addExpense = useCallback((expense: Omit<Expense, "id" | "createdAt">) => {
    setExpenses((prev) => [
      { ...expense, id: generateId(), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const updateExpense = useCallback(
    (id: string, expense: Omit<Expense, "id" | "createdAt">) => {
      setExpenses((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...expense } : item))
      );
    },
    []
  );

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(
    () => ({ expenses, loading, addExpense, updateExpense, deleteExpense }),
    [expenses, loading, addExpense, updateExpense, deleteExpense]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenseContext(): ExpenseContextValue {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
}
