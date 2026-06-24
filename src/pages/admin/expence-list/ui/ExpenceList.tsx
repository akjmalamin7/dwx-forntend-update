import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel, PanelHeading } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { EXPENSE_DATA_COL } from "./expence.data.col";
import { useGetExpenseListQuery } from "@/shared/redux/features/admin/expence/expenceApi";

const ExpenseList = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 100,
  });

  const { data: expenseList, isLoading } = useGetExpenseListQuery({
    page,
    limit,
    search,
  });

  const totalPages = expenseList?.pagination.totalPages || 1;

  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  const DATA_TABLE = useMemo(
    () =>
      expenseList?.data.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        title: item.title,
        category: item.category_id?.name,
        amount: item.amount,
        month: item.month,
        status: item.status,
        action: "",
      })) || [],
    [expenseList?.data, limit, page]
  );

  const COLUMN = EXPENSE_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}>
            <Link
              to={`/admin/expence-list/${record?.key}`}
              className="bg-yellow-500 text-white px-4 py-1 text-sm rounded"
            >
              Edit
            </Link>
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Expense List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return ( 

     <Panel
          header={
            <PanelHeading
              title="Expense List"
              button="Expense Add"
              path="/admin/expence-add"
            />
          }
          size="md"
        >

  
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        page={page}
        totalPages={totalPages}
        hasNext={expenseList?.pagination.hasNext}
        hasPrev={expenseList?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
      />
    </Panel>
  );
};

export default ExpenseList;