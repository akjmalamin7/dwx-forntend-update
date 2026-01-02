import { usePageTitle } from "@/shared/hooks";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetTransectionListQuery } from "../api/query";
import { BILL_DATA_COL } from "../model/bill.data.col";

export default function ManageTransactionList() {
  const { data: TransectionList, isLoading } = useGetTransectionListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      TransectionList?.map((item, index) => ({
        key: item._id,
        sl: index + 1,
        month: item.month,
        total_patients: item.total_patients,
        total_single: item.total_single,
        total_double: item.total_double,
        total_multiple: item.total_multiple,
        total_ecg: item.total_ecg,
        total_amount: item.total_amount ?? 0,
        status: item.status,
        action: "",
      })) || [],
    [TransectionList]
  );
  const COLUMN = BILL_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}>
            <Link
              to={`/agent/print-bill/${record?.key}`}
              className="bg-yellow-500 ml-2 text-white px-2 py-1 rounded text-sm"
            >
              Print Bill
            </Link>
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Manage Transection History", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
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
  return (
    <div>
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
    </div>
  );
}
