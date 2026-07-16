import SummaryCards from "@/components/dashboard/SummaryCards";
import CategoryChart from "@/components/dashboard/CategoryChart";
import TrendChart from "@/components/dashboard/TrendChart";
import RecentExpenses from "@/components/dashboard/RecentExpenses";
import IncomeSummaryCards from "@/components/dashboard/IncomeSummaryCards";
import IncomeCategoryChart from "@/components/dashboard/IncomeCategoryChart";
import IncomeTrendChart from "@/components/dashboard/IncomeTrendChart";
import RecentIncomes from "@/components/dashboard/RecentIncomes";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-400">
          A quick look at where your money is going.
        </p>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-zinc-200">Spending</h2>
        <SummaryCards />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CategoryChart />
          <TrendChart />
        </div>
        <RecentExpenses />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-zinc-200">Income</h2>
        <IncomeSummaryCards />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <IncomeCategoryChart />
          <IncomeTrendChart />
        </div>
        <RecentIncomes />
      </section>
    </div>
  );
}
