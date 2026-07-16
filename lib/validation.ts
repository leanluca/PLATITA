import type { RecordFormErrors, RecordFormValues } from "./types";

export function validateRecordValues<C extends string>(
  values: RecordFormValues<C>
): RecordFormErrors {
  const errors: RecordFormErrors = {};

  if (!values.date) {
    errors.date = "Date is required.";
  }

  const amount = Number(values.amount);
  if (!values.amount.trim()) {
    errors.amount = "Amount is required.";
  } else if (Number.isNaN(amount) || amount <= 0) {
    errors.amount = "Amount must be a positive number.";
  }

  if (!values.category) {
    errors.category = "Category is required.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  } else if (values.description.trim().length > 120) {
    errors.description = "Description must be 120 characters or fewer.";
  }

  return errors;
}

export function isValid(errors: RecordFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
