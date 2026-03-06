import { usePageTitle } from "@/shared/hooks";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import type { WSMessage } from "@/shared/hooks/use-socket/schema";
import { useSocket } from "@/shared/hooks/use-socket/useSocket";
import { useGetBillListQuery } from "@/shared/redux/features/agent/manage-bill/billListApi";
import { useGetCustomerSettingsQuery } from "@/shared/redux/features/agent/settings/customerSettingsApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { BILL_DATA_COL } from "./bill.data.col";

const ManageBill = () => {
  const { data: BillList, isLoading, refetch } = useGetBillListQuery();
  const { data: settingsData } = useGetCustomerSettingsQuery();
  // Prepare data
  const isPrint = settingsData?.data?.is_print === 2;

  const currentMonth = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}`; // 👈 e.g. "2026-3"
  }, []);

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
          status: item.month === currentMonth ? "Preparing" : item.status,
          action: "",
        })) || [],
    [BillList],
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
          const isCurrentMonth = record?.month === currentMonth;
          const isPaid = record?.status === "Paid";
          const hidePayButton = isCurrentMonth || isPaid;
          return (
            <div key={rowIndex}>
              {!hidePayButton && (
                <Link
                  to={`/agent/pay-bill/${record?.month}`}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                >
                  Pay Bill
                </Link>
              )}
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

  // websocket
  const wsUrl = import.meta.env.VITE_WS_URL;
  const { lastMessage } = useSocket<WSMessage>(wsUrl, 5000);

  useEffect(() => {
    if (
      lastMessage?.type === "bill_updated" ||
      lastMessage?.type === "submit_patient"
    ) {
      refetch();
    }
  }, [lastMessage, refetch]);

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
