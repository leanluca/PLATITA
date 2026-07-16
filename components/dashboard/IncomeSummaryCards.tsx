"use client";

import { useMemo } from "react";
import Card from "@/components/ui/Card";
import { useIncomeContext } from "@/contexts/IncomeContext";
import { INCOME_CATEGORY_META } from "@/lib/incomeCategories";
import { formatCurrency, isSameMonth } from "@/lib/utils";
import type { IncomeCategory } from "@/lib/types";

export default function IncomeSummaryCards() {
  const { incomes } = useIncomeContext();

  const { total, monthTotal, topCategory } = useMemo(() => {
    const now = new Date();
    const total = incomes.reduce((sum, e) => sum + e.amount, 0);
    const monthTotal = incomes
      .filter((e) => isSameMonth(e.date, now))
      .reduce((sum, e) => sum + e.amount, 0);

    const byCategory = new Map<IncomeCategory, number>();
    for (const income of incomes) {
      byCategory.set(income.category, (byCategory.get(income.category) ?? 0) + income.amount);
    }
    const sortedCategories = Array.from(byCategory.entries()).sort((a, b) => b[1] - a[1]);
    const topCategory: IncomeCategory | null =
      sortedCategories.length > 0 ? sortedCategories[0][0] : null;

    return { total, monthTotal, topCategory };
  }, [incomes]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <p className="text-sm text-zinc-400">Total income</p>
        <p className="mt-2 text-2xl font-semibold">{formatCurrency(total)}</p>
      </Card>
      <Card>
        <p className="text-sm text-zinc-400">This month</p>
        <p className="mt-2 text-2xl font-semibold">{formatCurrency(monthTotal)}</p>
      </Card>
      <Card>
        <p className="text-sm text-zinc-400">Top source</p>
        <p className="mt-2 text-2xl font-semibold">
          {topCategory ? (
            <span>
              {INCOME_CATEGORY_META[topCategory].icon} {topCategory}
            </span>
          ) : (
            <span className="text-zinc-500">—</span>
          )}
        </p>
      </Card>
    </div>
  );
}
