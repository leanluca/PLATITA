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
import type { Income } from "@/lib/types";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "platita:incomes";

interface IncomeContextValue {
  incomes: Income[];
  loading: boolean;
  addIncome: (income: Omit<Income, "id" | "createdAt">) => void;
  updateIncome: (id: string, income: Omit<Income, "id" | "createdAt">) => void;
  deleteIncome: (id: string) => void;
}

const IncomeContext = createContext<IncomeContextValue | undefined>(undefined);

export function IncomeProvider({ children }: { children: ReactNode }) {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIncomes(loadFromStorage<Income>(STORAGE_KEY));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) saveToStorage(STORAGE_KEY, incomes);
  }, [incomes, loading]);

  const addIncome = useCallback((income: Omit<Income, "id" | "createdAt">) => {
    setIncomes((prev) => [
      { ...income, id: generateId(), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const updateIncome = useCallback(
    (id: string, income: Omit<Income, "id" | "createdAt">) => {
      setIncomes((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...income } : item))
      );
    },
    []
  );

  const deleteIncome = useCallback((id: string) => {
    setIncomes((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(
    () => ({ incomes, loading, addIncome, updateIncome, deleteIncome }),
    [incomes, loading, addIncome, updateIncome, deleteIncome]
  );

  return <IncomeContext.Provider value={value}>{children}</IncomeContext.Provider>;
}

export function useIncomeContext(): IncomeContextValue {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error("useIncomeContext must be used within an IncomeProvider");
  }
  return context;
}
