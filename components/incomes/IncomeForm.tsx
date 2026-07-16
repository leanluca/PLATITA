"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { INCOME_CATEGORIES, type Income, type IncomeCategory, type IncomeFormValues } from "@/lib/types";
import { validateRecordValues, isValid } from "@/lib/validation";
import { todayIso } from "@/lib/utils";

interface IncomeFormProps {
  initialIncome?: Income;
  onSubmit: (values: { date: string; amount: number; category: IncomeCategory; description: string }) => void;
  onCancel: () => void;
}

const EMPTY_VALUES: IncomeFormValues = {
  date: todayIso(),
  amount: "",
  category: "",
  description: "",
};

export default function IncomeForm({ initialIncome, onSubmit, onCancel }: IncomeFormProps) {
  const [values, setValues] = useState<IncomeFormValues>(
    initialIncome
      ? {
          date: initialIncome.date,
          amount: String(initialIncome.amount),
          category: initialIncome.category,
          description: initialIncome.description,
        }
      : EMPTY_VALUES
  );
  const [errors, setErrors] = useState<ReturnType<typeof validateRecordValues>>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validateRecordValues(values);
    setErrors(validationErrors);
    if (!isValid(validationErrors)) return;

    onSubmit({
      date: values.date,
      amount: Number(values.amount),
      category: values.category as IncomeCategory,
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
        onChange={(e) => setValues((prev) => ({ ...prev, category: e.target.value as IncomeCategory }))}
        error={errors.category}
      >
        <option value="">Select a category…</option>
        {INCOME_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Input
        label="Description"
        name="description"
        placeholder="e.g. Monthly salary"
        value={values.description}
        onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
        error={errors.description}
      />
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialIncome ? "Save changes" : "Add income"}</Button>
      </div>
    </form>
  );
}
