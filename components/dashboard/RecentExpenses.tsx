"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import { useExpenseContext } from "@/contexts/ExpenseContext";
import { CATEGORY_META } from "@/lib/categories";
import { formatCurrency, formatDate } from "@/lib/utils";

const RECENT_COUNT = 5;

export default function RecentExpenses() {
  const { expenses } = useExpenseContext();

  const recent = [...expenses]
    .sort((a, b) => (a.date === b.date ? b.createdAt.localeCompare(a.createdAt) : b.date.localeCompare(a.date)))
    .slice(0, RECENT_COUNT);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-300">Recent expenses</p>
        <Link href="/expenses" className="text-sm text-accent hover:underline">
          View all →
        </Link>
      </div>
      {recent.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-500">
          No expenses yet. Add your first one on the Expenses page.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {recent.map((expense) => (
            <li key={expense.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-lg" aria-hidden>
                  {CATEGORY_META[expense.category].icon}
                </span>
                <div>
                  <p className="text-sm font-medium">{expense.description}</p>
                  <p className="text-xs text-zinc-500">{formatDate(expense.date)}</p>
                </div>
              </div>
              <span className="text-sm font-semibold">{formatCurrency(expense.amount)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
