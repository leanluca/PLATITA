import Button from "@/components/ui/Button";
import { INCOME_CATEGORY_META } from "@/lib/incomeCategories";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Income } from "@/lib/types";

interface IncomeItemProps {
  income: Income;
  onEdit: (income: Income) => void;
  onDelete: (id: string) => void;
}

export default function IncomeItem({ income, onEdit, onDelete }: IncomeItemProps) {
  const meta = INCOME_CATEGORY_META[income.category];

  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden>
          {meta.icon}
        </span>
        <div>
          <p className="text-sm font-medium">{income.description}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className={`rounded-full border px-2 py-0.5 text-xs ${meta.badgeClass}`}>
              {income.category}
            </span>
            <span className="text-xs text-zinc-500">{formatDate(income.date)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-sm font-semibold">{formatCurrency(income.amount)}</span>
        <div className="flex gap-1">
          <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => onEdit(income)}>
            Edit
          </Button>
          <Button
            variant="danger"
            className="px-2 py-1 text-xs"
            onClick={() => onDelete(income.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}
