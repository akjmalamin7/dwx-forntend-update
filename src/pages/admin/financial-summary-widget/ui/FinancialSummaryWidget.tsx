import { usePageTitle } from "@/shared/hooks";
import { Panel } from "@/shared/ui";
import { useGetFinancialSummaryQuery } from "@/shared/redux/features/admin/income/incomeApi";
import { useState } from "react";

const getCurrentMonth = () => {
  const now = new Date();
  const bdTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  return `${bdTime.getFullYear()}-${bdTime.getMonth() + 1}`;
};

const FinancialSummaryWidget = () => {
  const [month, setMonth] = useState(getCurrentMonth());

  // By Month (selected month)
  const { data: monthSummary, isLoading: isMonthLoading } =
    useGetFinancialSummaryQuery({ month });

  // All Summary (lifetime, no month filter)
  const { data: allSummary, isLoading: isAllLoading } =
    useGetFinancialSummaryQuery({});

  usePageTitle("Financial Summary", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    const [year, m] = value.split("-");
    setMonth(`${year}-${Number(m)}`);
  };

  const inputValue = (() => {
    const [year, m] = month.split("-");
    return `${year}-${String(m).padStart(2, "0")}`;
  })();

  const renderCards = (
    data:
      | {
          total_income: number;
          total_expense: number;
          total_loan_given: number;
          total_loan_repaid: number;
          total_agent_bill: number;
          total_doctor_bill: number;
          liquid_total: number;
        }
      | undefined
  ) => {
    const isLiquidNegative = (data?.liquid_total || 0) < 0;

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
            <p className="text-sm text-emerald-600 font-medium">
              Total Income
            </p>
            <p className="text-2xl font-bold text-emerald-700 mt-1">
              {data?.total_income?.toLocaleString() || 0} ৳
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <p className="text-sm text-red-600 font-medium">Total Expense</p>
            <p className="text-2xl font-bold text-red-700 mt-1">
              {data?.total_expense?.toLocaleString() || 0} ৳
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <p className="text-sm text-amber-600 font-medium">Loan Given</p>
            <p className="text-2xl font-bold text-amber-700 mt-1">
              {data?.total_loan_given?.toLocaleString() || 0} ৳
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <p className="text-sm text-blue-600 font-medium">Loan Repaid</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              {data?.total_loan_repaid?.toLocaleString() || 0} ৳
            </p>
          </div>

          <div
            className={`rounded-lg p-5 border ${
              isLiquidNegative
                ? "bg-red-100 border-red-300"
                : "bg-indigo-50 border-indigo-200"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                isLiquidNegative ? "text-red-700" : "text-indigo-600"
              }`}
            >
              Liquid Total
            </p>
            <p
              className={`text-2xl font-bold mt-1 ${
                isLiquidNegative ? "text-red-800" : "text-indigo-700"
              }`}
            >
              {data?.liquid_total?.toLocaleString() || 0} ৳
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-5">
            <p className="text-sm text-cyan-600 font-medium">
              Total Customer Bill
            </p>
            <p className="text-2xl font-bold text-cyan-700 mt-1">
              {data?.total_agent_bill?.toLocaleString() || 0} ৳
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <p className="text-sm text-purple-600 font-medium">
              Total Doctor Bill
            </p>
            <p className="text-2xl font-bold text-purple-700 mt-1">
              {data?.total_doctor_bill?.toLocaleString() || 0} ৳
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* ---------- By Month ---------- */}
      <Panel header="Financial Summary" size="lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-red-600">By Month</h3>
          <input
            type="month"
            value={inputValue}
            onChange={handleMonthChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        {isMonthLoading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : (
          renderCards(monthSummary?.data)
        )}
      </Panel>

      {/* ---------- All Summary (lifetime) ---------- */}
      <div className="mt-6">
        <Panel header="All Summary" size="lg">
          {isAllLoading ? (
            <div className="text-center py-10 text-gray-400">Loading...</div>
          ) : (
            renderCards(allSummary?.data)
          )}
        </Panel>
      </div>
    </>
  );
};

export default FinancialSummaryWidget;