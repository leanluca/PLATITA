import IncomeItem from "@/components/incomes/IncomeItem";
import type { Income } from "@/lib/types";

interface IncomeListProps {
  incomes: Income[];
  onEdit: (income: Income) => void;
  onDelete: (id: string) => void;
}

export default function IncomeList({ incomes, onEdit, onDelete }: IncomeListProps) {
  if (incomes.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-zinc-500">
        No incomes match your filters.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {incomes.map((income) => (
        <IncomeItem key={income.id} income={income} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
