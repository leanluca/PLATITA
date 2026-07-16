import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { CATEGORIES, type Category } from "@/lib/types";

export interface ExpenseFilterState {
  search: string;
  category: Category | "All";
  startDate: string;
  endDate: string;
}

interface ExpenseFiltersProps {
  filters: ExpenseFilterState;
  onChange: (filters: ExpenseFilterState) => void;
}

export default function ExpenseFilters({ filters, onChange }: ExpenseFiltersProps) {
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
        onChange={(e) => onChange({ ...filters, category: e.target.value as Category | "All" })}
      >
        <option value="All">All categories</option>
        {CATEGORIES.map((category) => (
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
