import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { INCOME_CATEGORIES, type IncomeCategory } from "@/lib/types";

export interface IncomeFilterState {
  search: string;
  category: IncomeCategory | "All";
  startDate: string;
  endDate: string;
}

interface IncomeFiltersProps {
  filters: IncomeFilterState;
  onChange: (filters: IncomeFilterState) => void;
}

export default function IncomeFilters({ filters, onChange }: IncomeFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Input
        label="Search"
        name="search"
        placeholder="Search description…"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />
      <Select
        label="Category"
        name="filter-category"
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value as IncomeCategory | "All" })}
      >
        <option value="All">All categories</option>
        {INCOME_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Input
        label="From"
        name="startDate"
        type="date"
        value={filters.startDate}
        onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
      />
      <Input
        label="To"
        name="endDate"
        type="date"
        value={filters.endDate}
        onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
      />
    </div>
  );
}
