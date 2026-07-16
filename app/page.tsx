import SummaryCards from "@/components/dashboard/SummaryCards";
import CategoryChart from "@/components/dashboard/CategoryChart";
import TrendChart from "@/components/dashboard/TrendChart";
import RecentExpenses from "@/components/dashboard/RecentExpenses";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-400">
          A quick look at where your money is going.
        </p>
      </div>
      <SummaryCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CategoryChart />
        <TrendChart />
      </div>
      <RecentExpenses />
    </div>
  );
}
