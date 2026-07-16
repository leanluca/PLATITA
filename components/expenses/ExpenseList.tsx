import ExpenseItem from "@/components/expenses/ExpenseItem";
import type { Expense } from "@/lib/types";

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-zinc-500">
        No expenses match your filters.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
