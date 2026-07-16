"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseFilters, {
  type ExpenseFilterState,
} from "@/components/expenses/ExpenseFilters";
import ExpenseList from "@/components/expenses/ExpenseList";
import { useExpenseContext } from "@/contexts/ExpenseContext";
import { buildCsv, downloadCsv } from "@/lib/csv";
import type { Category, Expense } from "@/lib/types";

const EMPTY_FILTERS: ExpenseFilterState = {
  search: "",
  category: "All",
  startDate: "",
  endDate: "",
};

export default function ExpensesPage() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenseContext();
  const [filters, setFilters] = useState<ExpenseFilterState>(EMPTY_FILTERS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((expense) => {
        if (filters.category !== "All" && expense.category !== filters.category) return false;
        if (filters.startDate && expense.date < filters.startDate) return false;
        if (filters.endDate && expense.date > filters.endDate) return false;
        if (
          filters.search &&
          !expense.description.toLowerCase().includes(filters.search.toLowerCase())
        )
          return false;
        return true;
      })
      .sort((a, b) => (a.date === b.date ? b.createdAt.localeCompare(a.createdAt) : b.date.localeCompare(a.date)));
  }, [expenses, filters]);

  const openAddModal = () => {
    setEditingExpense(undefined);
    setIsFormOpen(true);
  };

  const openEditModal = (expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const closeModal = () => {
    setIsFormOpen(false);
    setEditingExpense(undefined);
  };

  const handleSubmit = (values: {
    date: string;
    amount: number;
    category: Category;
    description: string;
  }) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, values);
    } else {
      addExpense(values);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this expense? This can't be undone.")) {
      deleteExpense(id);
    }
  };

  const handleExport = () => {
    const csv = buildCsv(filteredExpenses);
    downloadCsv(csv, `platita-expenses-${Date.now()}.csv`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Expenses</h1>
          <p className="mt-1 text-sm text-zinc-400">
            {filteredExpenses.length} of {expenses.length} expense
            {expenses.length === 1 ? "" : "s"} shown
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleExport} disabled={filteredExpenses.length === 0}>
            Export CSV
          </Button>
          <Button onClick={openAddModal}>+ Add expense</Button>
        </div>
      </div>

      <Card>
        <ExpenseFilters filters={filters} onChange={setFilters} />
      </Card>

      <Card className="p-0">
        <div className="px-5">
          <ExpenseList expenses={filteredExpenses} onEdit={openEditModal} onDelete={handleDelete} />
        </div>
      </Card>

      <Modal
        open={isFormOpen}
        onClose={closeModal}
        title={editingExpense ? "Edit expense" : "Add expense"}
      >
        <ExpenseForm
          initialExpense={editingExpense}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
