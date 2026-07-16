"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "@/components/ui/Card";
import { useIncomeContext } from "@/contexts/IncomeContext";
import { formatCurrency, monthLabel } from "@/lib/utils";

const MONTHS_TO_SHOW = 6;

export default function IncomeTrendChart() {
  const { incomes } = useIncomeContext();

  const data = useMemo(() => {
    const now = new Date();
    const months: { key: string; label: string; year: number; month: number }[] = [];
    for (let i = MONTHS_TO_SHOW - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: monthLabel(d.getFullYear(), d.getMonth()),
        year: d.getFullYear(),
        month: d.getMonth(),
      });
    }

    const totals = new Map(months.map((m) => [m.key, 0]));
    for (const income of incomes) {
      const [year, month] = income.date.split("-").map(Number);
      const key = `${year}-${month - 1}`;
      if (totals.has(key)) {
        totals.set(key, (totals.get(key) ?? 0) + income.amount);
      }
    }

    return months.map((m) => ({ label: m.label, amount: totals.get(m.key) ?? 0 }));
  }, [incomes]);

  return (
    <Card>
      <p className="mb-4 text-sm font-medium text-zinc-300">Monthly trend</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="label" stroke="#a1a1aa" fontSize={12} />
          <YAxis stroke="#a1a1aa" fontSize={12} width={40} />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: 8,
              color: "#f4f4f5",
            }}
            cursor={{ fill: "rgba(34, 197, 94, 0.08)" }}
          />
          <Bar dataKey="amount" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
