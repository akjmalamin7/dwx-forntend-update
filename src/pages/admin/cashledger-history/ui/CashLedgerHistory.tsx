import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel, PanelHeading } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react"; 
import { CASH_LEDGER_DATA_COL } from "./cashLedger.data.col";
import toast, { Toaster } from "react-hot-toast";
import { useDeleteManualEntryMutation, useGetLedgerHistoryQuery } from "@/shared/redux/features/admin/cash-ledger/cashLedgerApi";

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  opening_balance: { label: "Opening Balance", color: "bg-gray-100 text-gray-700" },
  income: { label: "Income", color: "bg-emerald-100 text-emerald-700" },
  expense: { label: "Expense", color: "bg-red-100 text-red-700" },
  loan_given: { label: "Loan Given", color: "bg-amber-100 text-amber-700" },
  loan_repaid: { label: "Loan Repaid", color: "bg-blue-100 text-blue-700" },
  manual_deposit: { label: "Manual Deposit", color: "bg-cyan-100 text-cyan-700" },
  manual_withdraw: { label: "Manual Withdraw", color: "bg-orange-100 text-orange-700" },
};

const NEGATIVE_TYPES = new Set(["expense", "loan_given", "manual_withdraw"]);

const CashLedgerHistory = () => {
  const { page, limit, setPage, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 20,
  });

  const { data: history, isLoading } = useGetLedgerHistoryQuery({
    page,
    limit,
  });

  const [deleteManualEntry] = useDeleteManualEntryMutation();

  const totalPages = history?.pagination.totalPages || 1;

  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (!confirmed) return;

    try {
      await deleteManualEntry(id).unwrap();
      toast.success("Entry deleted", { duration: 2000, position: "top-right" });
    } catch (err) {
      console.error("Failed to delete entry", err);
      toast.error("Failed to delete entry", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const DATA_TABLE = useMemo(
    () =>
      history?.data.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        date: new Date(item.date).toLocaleDateString(),
        type: item.type,
        note: item.note || "-",
        amount: `${
          NEGATIVE_TYPES.has(item.type) ? "− " : "+ "
        }${item.amount.toLocaleString()} ৳`,
        action: item.type,
      })) || [],
    [history?.data, limit, page]
  );

  const COLUMN = CASH_LEDGER_DATA_COL.map((col) => {
    if (col.key === "type") {
      return {
        ...col,
        render: (value: unknown) => {
          const meta = TYPE_LABELS[value as string] || {
            label: value as string,
            color: "bg-gray-100 text-gray-700",
          };
          return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${meta.color}`}>
              {meta.label}
            </span>
          );
        },
      };
    }
    if (col.key === "action") {
      return {
        ...col,
        render: (_: unknown, record?: DataSource) => {
          const isManual =
            record?.action === "manual_deposit" ||
            record?.action === "manual_withdraw";

          if (!isManual) {
            return <span className="text-gray-400 text-xs">—</span>;
          }

          return (
            <button
              onClick={() => handleDelete(record?.key as string)}
              className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600"
            >
              Delete
            </button>
          );
        },
      };
    }
    return col;
  });

  usePageTitle("Cash Ledger History", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <>
      <Toaster />
      <Panel
        header={
          <PanelHeading
            title="Cash Ledger History"
            button="Cash Balance"
            path="/admin/cash-ledger/balance"
          />
        }
        size="lg"
      >
        <DataTable
          isLoading={isLoading}
          column={COLUMN}
          dataSource={DATA_TABLE}
          page={page}
          totalPages={totalPages}
          hasNext={history?.pagination.hasNext}
          hasPrev={history?.pagination.hasPrev}
          setPage={setPage}
          setLimit={setLimit}
          limit={limit}
        />
      </Panel>
    </>
  );
};

export default CashLedgerHistory;