"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import { useIncomeContext } from "@/contexts/IncomeContext";
import { INCOME_CATEGORY_META } from "@/lib/incomeCategories";
import { formatCurrency, formatDate } from "@/lib/utils";

const RECENT_COUNT = 5;

export default function RecentIncomes() {
  const { incomes } = useIncomeContext();

  const recent = [...incomes]
    .sort((a, b) => (a.date === b.date ? b.createdAt.localeCompare(a.createdAt) : b.date.localeCompare(a.date)))
    .slice(0, RECENT_COUNT);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-300">Recent incomes</p>
        <Link href="/incomes" className="text-sm text-accent hover:underline">
          View all →
        </Link>
      </div>
      {recent.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-500">
          No incomes yet. Add your first one on the Incomes page.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {recent.map((income) => (
            <li key={income.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-lg" aria-hidden>
                  {INCOME_CATEGORY_META[income.category].icon}
                </span>
                <div>
                  <p className="text-sm font-medium">{income.description}</p>
                  <p className="text-xs text-zinc-500">{formatDate(income.date)}</p>
                </div>
              </div>
              <span className="text-sm font-semibold">{formatCurrency(income.amount)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
