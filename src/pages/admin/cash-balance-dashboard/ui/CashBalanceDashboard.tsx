import { usePageTitle } from "@/shared/hooks";
import { useGetCurrentBalanceQuery } from "@/shared/redux/features/admin/cash-ledger/cashLedgerApi";
import { Panel, PanelHeading } from "@/shared/ui"; 

const CashBalanceDashboard = () => {
  const { data: balanceData, isLoading } = useGetCurrentBalanceQuery();

  usePageTitle("Cash Balance", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const data = balanceData?.data;
  const isNegative = (data?.current_balance || 0) < 0;

  return (
    <Panel
      header={
        <PanelHeading
          title="Cash Balance"
          button="Cash Ledger History"
          path="/admin/cash-ledger/history"
        />
      }
      size="lg"
    >
      {isLoading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : (
        <>
          {/* ---------- Current Balance (Hero) ---------- */}
          <div
            className={`rounded-lg p-8 mb-8 border text-center ${
              isNegative
                ? "bg-red-50 border-red-300"
                : "bg-emerald-50 border-emerald-300"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                isNegative ? "text-red-600" : "text-emerald-600"
              }`}
            >
              Current Balance
            </p>
            <p
              className={`text-4xl font-bold mt-2 ${
                isNegative ? "text-red-700" : "text-emerald-700"
              }`}
            >
              {data?.current_balance?.toLocaleString() || 0} ৳
            </p>
          </div>

          {/* ---------- Breakdown ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <p className="text-sm text-gray-600 font-medium">
                Opening Balance
              </p>
              <p className="text-xl font-bold text-gray-700 mt-1">
                {data?.breakdown.opening_balance?.toLocaleString() || 0} ৳
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
              <p className="text-sm text-emerald-600 font-medium">
                Total Income
              </p>
              <p className="text-xl font-bold text-emerald-700 mt-1">
                + {data?.breakdown.total_income?.toLocaleString() || 0} ৳
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <p className="text-sm text-red-600 font-medium">
                Total Expense
              </p>
              <p className="text-xl font-bold text-red-700 mt-1">
                − {data?.breakdown.total_expense?.toLocaleString() || 0} ৳
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
              <p className="text-sm text-amber-600 font-medium">
                Loan Given
              </p>
              <p className="text-xl font-bold text-amber-700 mt-1">
                − {data?.breakdown.total_loan_given?.toLocaleString() || 0} ৳
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <p className="text-sm text-blue-600 font-medium">
                Loan Repaid
              </p>
              <p className="text-xl font-bold text-blue-700 mt-1">
                + {data?.breakdown.total_loan_repaid?.toLocaleString() || 0} ৳
              </p>
            </div>

            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-5">
              <p className="text-sm text-cyan-600 font-medium">
                Manual Deposit
              </p>
              <p className="text-xl font-bold text-cyan-700 mt-1">
                +{" "}
                {data?.breakdown.total_manual_deposit?.toLocaleString() || 0}{" "}
                ৳
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
              <p className="text-sm text-orange-600 font-medium">
                Manual Withdraw
              </p>
              <p className="text-xl font-bold text-orange-700 mt-1">
                −{" "}
                {data?.breakdown.total_manual_withdraw?.toLocaleString() ||
                  0}{" "}
                ৳
              </p>
            </div>
          </div>
        </>
      )}
    </Panel>
  );
};

export default CashBalanceDashboard;