import { usePageTitle } from "@/shared/hooks";
import { Loader, Panel, PanelHeading } from "@/shared/ui";
import { useGetLoanRepaymentHistoryQuery } from "@/shared/redux/features/admin/loan/loanApi";
import { useParams } from "react-router-dom";

const LoanRepaymentHistory = () => {
  const { loanId } = useParams<{ loanId: string }>();

  const { data: history, isLoading } = useGetLoanRepaymentHistoryQuery(
    { loanId: loanId as string },
    { skip: !loanId }
  );

  usePageTitle("Repayment History", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  if (isLoading) return <Loader />;

  const repayments = history?.data || [];

  return (
    <Panel
      header={
        <PanelHeading
          title="Repayment History"
          button="Loan List"
          path="/admin/loan"
        />
      }
      size="lg"
    >
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-left px-4 py-3 font-medium">Employee</th>
              <th className="text-left px-4 py-3 font-medium">Note</th>
              <th className="text-right px-4 py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {repayments.length ? (
              repayments.map((item) => (
                <tr key={item._id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{item.employee_id?.name}</td>
                  <td className="px-4 py-3">{item.note || "-"}</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {item.amount.toLocaleString()} Taka
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">
                  No repayment history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
};

export default LoanRepaymentHistory;