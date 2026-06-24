import { usePageTitle } from "@/shared/hooks";
import { Panel } from "@/shared/ui";
import { DataTable } from "@/widgets";
import { useMemo, useState } from "react";
import { useGetExpenseSummaryQuery } from "@/shared/redux/features/admin/expence/expenceApi";
import { EXPENSE_SUMMARY_DATA_COL } from "./expence.summary.data.col";

const getCurrentMonth = () => {
  const now = new Date();
  const bdTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  return `${bdTime.getFullYear()}-${bdTime.getMonth() + 1}`;
};

const formatMonthLabel = (month: string) => {
  const [year, m] = month.split("-");
  const date = new Date(Number(year), Number(m) - 1);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
};

const ExpenseSummary = () => {
  const [month, setMonth] = useState(getCurrentMonth());

  const { data: summary, isLoading } = useGetExpenseSummaryQuery({ month });

  usePageTitle("Expense Summary", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // "2026-05"
    if (!value) return;
    const [year, m] = value.split("-");
    setMonth(`${year}-${Number(m)}`); // -> "2026-5"
  };

  const inputValue = (() => {
    const [year, m] = month.split("-");
    return `${year}-${String(m).padStart(2, "0")}`;
  })();

  const DATA_TABLE = useMemo(
    () =>
      summary?.data?.map((item, index) => ({
        key: item.category_id,
        sl: index + 1,
        category_name: item.category_name,
        count: item.count,
        total: `${item.total.toLocaleString()} ৳`,
      })) || [],
    [summary]
  );

  return (
    <Panel header="Expense Summary" size="lg">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-700">
          {formatMonthLabel(month)}
        </h3>
        <input
          type="month"
          value={inputValue}
          onChange={handleMonthChange}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* ---------- Top Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <p className="text-sm text-blue-600 font-medium">Grand Total</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">
            {summary?.grandTotal?.toLocaleString() || 0} ৳
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
          <p className="text-sm text-emerald-600 font-medium">
            Total Categories
          </p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {summary?.data?.length || 0}
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
          <p className="text-sm text-amber-600 font-medium">Total Entries</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">
            {summary?.data?.reduce((sum, item) => sum + item.count, 0) || 0}
          </p>
        </div>
      </div>

      {/* ---------- Category Breakdown Table ---------- */}
      <DataTable
        isLoading={isLoading}
        column={EXPENSE_SUMMARY_DATA_COL}
        dataSource={DATA_TABLE}
        page={1}
        totalPages={1}
        setPage={() => {}}
      />
    </Panel>
  );
};

export default ExpenseSummary;