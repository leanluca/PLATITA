"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import IncomeForm from "@/components/incomes/IncomeForm";
import IncomeFilters, {
  type IncomeFilterState,
} from "@/components/incomes/IncomeFilters";
import IncomeList from "@/components/incomes/IncomeList";
import { useIncomeContext } from "@/contexts/IncomeContext";
import { buildCsv, downloadCsv } from "@/lib/csv";
import type { Income, IncomeCategory } from "@/lib/types";

const EMPTY_FILTERS: IncomeFilterState = {
  search: "",
  category: "All",
  startDate: "",
  endDate: "",
};

export default function IncomesPage() {
  const { incomes, addIncome, updateIncome, deleteIncome } = useIncomeContext();
  const [filters, setFilters] = useState<IncomeFilterState>(EMPTY_FILTERS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | undefined>(undefined);

  const filteredIncomes = useMemo(() => {
    return incomes
      .filter((income) => {
        if (filters.category !== "All" && income.category !== filters.category) return false;
        if (filters.startDate && income.date < filters.startDate) return false;
        if (filters.endDate && income.date > filters.endDate) return false;
        if (
          filters.search &&
          !income.description.toLowerCase().includes(filters.search.toLowerCase())
        )
          return false;
        return true;
      })
      .sort((a, b) => (a.date === b.date ? b.createdAt.localeCompare(a.createdAt) : b.date.localeCompare(a.date)));
  }, [incomes, filters]);

  const openAddModal = () => {
    setEditingIncome(undefined);
    setIsFormOpen(true);
  };

  const openEditModal = (income: Income) => {
    setEditingIncome(income);
    setIsFormOpen(true);
  };

  const closeModal = () => {
    setIsFormOpen(false);
    setEditingIncome(undefined);
  };

  const handleSubmit = (values: {
    date: string;
    amount: number;
    category: IncomeCategory;
    description: string;
  }) => {
    if (editingIncome) {
      updateIncome(editingIncome.id, values);
    } else {
      addIncome(values);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this income? This can't be undone.")) {
      deleteIncome(id);
    }
  };

  const handleExport = () => {
    const csv = buildCsv(filteredIncomes);
    downloadCsv(csv, `platita-incomes-${Date.now()}.csv`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Incomes</h1>
          <p className="mt-1 text-sm text-zinc-400">
            {filteredIncomes.length} of {incomes.length} income
            {incomes.length === 1 ? "" : "s"} shown
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleExport} disabled={filteredIncomes.length === 0}>
            Export CSV
          </Button>
          <Button onClick={openAddModal}>+ Add income</Button>
        </div>
      </div>

      <Card>
        <IncomeFilters filters={filters} onChange={setFilters} />
      </Card>

      <Card className="p-0">
        <div className="px-5">
          <IncomeList incomes={filteredIncomes} onEdit={openEditModal} onDelete={handleDelete} />
        </div>
      </Card>

      <Modal
        open={isFormOpen}
        onClose={closeModal}
        title={editingIncome ? "Edit income" : "Add income"}
      >
        <IncomeForm
          initialIncome={editingIncome}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
