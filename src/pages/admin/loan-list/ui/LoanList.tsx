import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel, PanelHeading } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetLoanListQuery } from "@/shared/redux/features/admin/loan/loanApi";
import { LOAN_DATA_COL } from "./loan.data.col";

const LoanList = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });

  const { data: loanList, isLoading } = useGetLoanListQuery({
    page,
    limit,
    search,
  });

  const totalPages = loanList?.pagination.totalPages || 1;

  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  const DATA_TABLE = useMemo(
    () =>
      loanList?.data.map((item, index) => ({
        key: item.employee_id,
        sl: (page - 1) * limit + index + 1,
        employee_name: item.employee_name,
        total_loan: `${item.total_loan.toLocaleString()} TK`,
        total_paid: `${item.total_paid.toLocaleString()} TK`,
        total_remaining: `${item.total_remaining.toLocaleString()} TK`,
        active_count: item.active_count,
        action: "",
      })) || [],
    [loanList?.data, limit, page]
  );

  const COLUMN = LOAN_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            <Link
              to={`/admin/loan/detail/${record?.key}`}
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
            >
              View
            </Link>
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Loan List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel
      header={
        <PanelHeading
          title="Loan List"
          button="Add Loan"
          path="/admin/loan/add"
        />
      }
      size="lg"
    >
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        page={page}
        totalPages={totalPages}
        hasNext={loanList?.pagination.hasNext}
        hasPrev={loanList?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
      />
    </Panel>
  );
};

export default LoanList;