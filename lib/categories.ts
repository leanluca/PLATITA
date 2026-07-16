import type { Category } from "./types";

interface CategoryMeta {
  label: Category;
  icon: string;
  color: string; // hex, used directly by Recharts (SVG fill) and inline styles
  badgeClass: string; // Tailwind classes for badges/pills
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  Food: {
    label: "Food",
    icon: "🍔",
    color: "#f59e0b",
    badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  Transportation: {
    label: "Transportation",
    icon: "🚗",
    color: "#3b82f6",
    badgeClass: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  Entertainment: {
    label: "Entertainment",
    icon: "🎬",
    color: "#a855f7",
    badgeClass: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  },
  Shopping: {
    label: "Shopping",
    icon: "🛍️",
    color: "#ec4899",
    badgeClass: "bg-pink-500/15 text-pink-400 border-pink-500/30",
  },
  Bills: {
    label: "Bills",
    icon: "🧾",
    color: "#ef4444",
    badgeClass: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  Other: {
    label: "Other",
    icon: "📦",
    color: "#10b981",
    badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
};
