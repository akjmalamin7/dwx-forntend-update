import { usePageTitle } from "@/shared/hooks";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { useGetBillListQuery } from "@/shared/redux/features/agent/manage-bill/billListApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BILL_DATA_COL } from "./bill.data.col";
import { useGetCustomerSettingsQuery } from "@/shared/redux/features/agent/settings/customerSettingsApi";

const ManageBill = () => {
  const { data: BillList, isLoading } = useGetBillListQuery();
  const { data: settingsData } = useGetCustomerSettingsQuery();
  // Prepare data
   const isPrint = settingsData?.data?.is_print === 1;

  const DATA_TABLE = useMemo(
    () =>
      BillList?.slice() // don't mutate original
        .sort((a, b) => {
          const [aYear, aMonth] = a.month.split("-").map(Number);
          const [bYear, bMonth] = b.month.split("-").map(Number);
          return bYear !== aYear ? bYear - aYear : bMonth - aMonth;
        })
        .map((item, index) => ({
          key: item._id,
          sl: index + 1,
          month: item.month,
          status: item.status,
          action: "",
        })) || [],
    [BillList]
  );

  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
  } = useSearchPagination({
    data: DATA_TABLE,
    searchFields: ["month"],
    rowsPerPage: 100,
  });

  const COLUMN = BILL_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => {
          if (isPrint) return null;
          return (
            <div key={rowIndex}>
              <Link
                to={`/agent/pay-bill/${record?.month}`}
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
              >
                Pay Bill
              </Link>
              <Link
                to={`/agent/print-bill/${record?.month}`}
                className="bg-yellow-500 ml-2 text-white px-2 py-1 rounded text-sm"
              >
                Print Bill
              </Link>
            </div>
          );
        },
      };
    }
    return item;
  });

  usePageTitle("Manage Bill", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel header="Manage Bill" size="lg">
      <div className="w-1/3">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by month name"
        />
      </div>

      <Table loading={isLoading} columns={COLUMN} dataSource={paginatedData} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </Panel>
  );
};

export default ManageBill;
