interface CsvRecord {
  date: string;
  category: string;
  description: string;
  amount: number;
}

function escapeCsvField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export function buildCsv<T extends CsvRecord>(records: T[]): string {
  const header = ["Date", "Category", "Description", "Amount"];
  const rows = records.map((record) => [
    record.date,
    record.category,
    escapeCsvField(record.description),
    record.amount.toFixed(2),
  ]);
  return [header, ...rows].map((row) => row.join(",")).join("\n");
}

export function downloadCsv(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
