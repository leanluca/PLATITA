"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { CATEGORIES, type Category, type Expense, type ExpenseFormValues } from "@/lib/types";
import { validateExpense, isValid } from "@/lib/validation";
import { todayIso } from "@/lib/utils";

interface ExpenseFormProps {
  initialExpense?: Expense;
  onSubmit: (values: { date: string; amount: number; category: Category; description: string }) => void;
  onCancel: () => void;
}

const EMPTY_VALUES: ExpenseFormValues = {
  date: todayIso(),
  amount: "",
  category: "",
  description: "",
};

export default function ExpenseForm({ initialExpense, onSubmit, onCancel }: ExpenseFormProps) {
  const [values, setValues] = useState<ExpenseFormValues>(
    initialExpense
      ? {
          date: initialExpense.date,
          amount: String(initialExpense.amount),
          category: initialExpense.category,
          description: initialExpense.description,
        }
      : EMPTY_VALUES
  );
  const [errors, setErrors] = useState<ReturnType<typeof validateExpense>>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validateExpense(values);
    setErrors(validationErrors);
    if (!isValid(validationErrors)) return;

    onSubmit({
      date: values.date,
      amount: Number(values.amount),
      category: values.category as Category,
      description: values.description.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Date"
        name="date"
        type="date"
        value={values.date}
        onChange={(e) => setValues((prev) => ({ ...prev, date: e.target.value }))}
        error={errors.date}
      />
      <Input
        label="Amount"
        name="amount"
        type="number"
        step="0.01"
        placeholder="0.00"
        value={values.amount}
        onChange={(e) => setValues((prev) => ({ ...prev, amount: e.target.value }))}
        error={errors.amount}
      />
      <Select
        label="Category"
        name="category"
        value={values.category}
        onChange={(e) => setValues((prev) => ({ ...prev, category: e.target.value as Category }))}
        error={errors.category}
      >
        <option value="">Select a category…</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Input
        label="Description"
        name="description"
        placeholder="e.g. Groceries at Trader Joe's"
        value={values.description}
        onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
        error={errors.description}
      />
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialExpense ? "Save changes" : "Add expense"}</Button>
      </div>
    </form>
  );
}
