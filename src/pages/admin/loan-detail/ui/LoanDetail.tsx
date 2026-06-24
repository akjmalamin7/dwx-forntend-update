import { usePageTitle } from "@/shared/hooks";
import { Loader, Panel, PanelHeading } from "@/shared/ui";
import { useGetLoanDetailByEmployeeQuery } from "@/shared/redux/features/admin/loan/loanApi";
import { useParams, Link, useNavigate } from "react-router-dom";

const LoanDetail = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();

  const { data: loanDetail, isLoading } = useGetLoanDetailByEmployeeQuery(
    { employeeId: employeeId as string },
    { skip: !employeeId }
  );

  usePageTitle("Employee Loan Detail", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  if (isLoading) return <Loader />;

  const summary = loanDetail?.summary;
  const loans = loanDetail?.data || [];

  return (
    <Panel
      header={
        <PanelHeading
          title="Employee Loan Detail"
          button="Loan List"
          path="/admin/loan"
        />
      }
      size="lg"
    >
      {/* ---------- Summary Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <p className="text-sm text-blue-600 font-medium">Total Loan</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">
            {summary?.total_loan?.toLocaleString() || 0} TK
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
          <p className="text-sm text-emerald-600 font-medium">Total Paid</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {summary?.total_paid?.toLocaleString() || 0} TK
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
          <p className="text-sm text-amber-600 font-medium">Remaining</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">
            {summary?.total_remaining?.toLocaleString() || 0} TK
          </p>
        </div>
      </div>

      {/* ---------- Loan-wise Table ---------- */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-left px-4 py-3 font-medium">Loan</th>
              <th className="text-right px-4 py-3 font-medium">Paid</th>
              <th className="text-right px-4 py-3 font-medium">Remaining</th>
              <th className="text-center px-4 py-3 font-medium">Status</th>
              <th className="text-center px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.length ? (
              loans.map((loan) => (
                <tr key={loan._id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    {new Date(loan.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {loan.note || "Loan"} - {loan.total_loan.toLocaleString()}{" "}
                    TK
                  </td>
                  <td className="px-4 py-3 text-right">
                    {loan.paid_amount.toLocaleString()} TK
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {loan.remaining.toLocaleString()} TK
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        loan.status === "active"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          navigate(`/admin/loan/repay/${loan._id}`, {
                            state: { employeeName: loan.employee_id.name },
                          })
                        }
                        className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600"
                      >
                        Repay
                      </button>
                      <Link
                        to={`/admin/loan/repay/history/${loan._id}`}
                        className="bg-gray-500 text-white px-3 py-1 text-xs rounded hover:bg-gray-600"
                      >
                        History
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No loan records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
};

export default LoanDetail;