"use client";

import { useMemo } from "react";
import Card from "@/components/ui/Card";
import { useExpenseContext } from "@/contexts/ExpenseContext";
import { CATEGORY_META } from "@/lib/categories";
import { formatCurrency, isSameMonth } from "@/lib/utils";
import type { Category } from "@/lib/types";

export default function SummaryCards() {
  const { expenses } = useExpenseContext();

  const { total, monthTotal, topCategory } = useMemo(() => {
    const now = new Date();
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const monthTotal = expenses
      .filter((e) => isSameMonth(e.date, now))
      .reduce((sum, e) => sum + e.amount, 0);

    const byCategory = new Map<Category, number>();
    for (const expense of expenses) {
      byCategory.set(expense.category, (byCategory.get(expense.category) ?? 0) + expense.amount);
    }
    const sortedCategories = Array.from(byCategory.entries()).sort((a, b) => b[1] - a[1]);
    const topCategory: Category | null = sortedCategories.length > 0 ? sortedCategories[0][0] : null;

    return { total, monthTotal, topCategory };
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <p className="text-sm text-zinc-400">Total spending</p>
        <p className="mt-2 text-2xl font-semibold">{formatCurrency(total)}</p>
      </Card>
      <Card>
        <p className="text-sm text-zinc-400">This month</p>
        <p className="mt-2 text-2xl font-semibold">{formatCurrency(monthTotal)}</p>
      </Card>
      <Card>
        <p className="text-sm text-zinc-400">Top category</p>
        <p className="mt-2 text-2xl font-semibold">
          {topCategory ? (
            <span>
              {CATEGORY_META[topCategory].icon} {topCategory}
            </span>
          ) : (
            <span className="text-zinc-500">—</span>
          )}
        </p>
      </Card>
    </div>
  );
}
