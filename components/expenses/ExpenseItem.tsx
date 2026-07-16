import Button from "@/components/ui/Button";
import { CATEGORY_META } from "@/lib/categories";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Expense } from "@/lib/types";

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ expense, onEdit, onDelete }: ExpenseItemProps) {
  const meta = CATEGORY_META[expense.category];

  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden>
          {meta.icon}
        </span>
        <div>
          <p className="text-sm font-medium">{expense.description}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className={`rounded-full border px-2 py-0.5 text-xs ${meta.badgeClass}`}>
              {expense.category}
            </span>
            <span className="text-xs text-zinc-500">{formatDate(expense.date)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-sm font-semibold">{formatCurrency(expense.amount)}</span>
        <div className="flex gap-1">
          <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => onEdit(expense)}>
            Edit
          </Button>
          <Button
            variant="danger"
            className="px-2 py-1 text-xs"
            onClick={() => onDelete(expense.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}
