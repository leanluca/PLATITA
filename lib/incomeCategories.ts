import type { IncomeCategory } from "./types";

interface IncomeCategoryMeta {
  label: IncomeCategory;
  icon: string;
  color: string; // hex, used directly by Recharts (SVG fill) and inline styles
  badgeClass: string; // Tailwind classes for badges/pills
}

export const INCOME_CATEGORY_META: Record<IncomeCategory, IncomeCategoryMeta> = {
  Salary: {
    label: "Salary",
    icon: "💼",
    color: "#22c55e",
    badgeClass: "bg-green-500/15 text-green-400 border-green-500/30",
  },
  Freelance: {
    label: "Freelance",
    icon: "💻",
    color: "#06b6d4",
    badgeClass: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  },
  Investments: {
    label: "Investments",
    icon: "📈",
    color: "#6366f1",
    badgeClass: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  },
  Gifts: {
    label: "Gifts",
    icon: "🎁",
    color: "#f472b6",
    badgeClass: "bg-pink-500/15 text-pink-400 border-pink-500/30",
  },
  Other: {
    label: "Other",
    icon: "💰",
    color: "#94a3b8",
    badgeClass: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  },
};
