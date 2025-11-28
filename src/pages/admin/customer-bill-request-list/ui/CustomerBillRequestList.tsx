import { useGetCustomerBillRequestByMonthQuery } from "@/entities/admin/bill/api/query";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { CUSTOMER_DATA_COL } from "./manageCustomerBill.data.col";

const CustomerBillRequestList = () => {
  const { month } = useParams<{ month: string }>();
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const { data: billList, isLoading } = useGetCustomerBillRequestByMonthQuery({
    page,
    limit,
    month,
    search,
  });

  const totalPages = billList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  const DATA_TABLE = useMemo(
    () =>
      billList?.data?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        month: item.month,
        customer: item.user_id.email,
        total_patients: item.total_patients,
        total_amount: item.total_amount,
        status: item.status,
        paid_amount: item.paid_amount,
        payment_date: item.payment_date
          ? new Date(item.payment_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "—",
        received_number: item.received_number,
        action: "",
      })) || [],
    [billList?.data, limit, page]
  );

  const COLUMN = CUSTOMER_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex gap-2">
            <Link
              to={`/admin/customer-pay-bill/${record?.key}`}
              className="bg-blue-500 text-white px-4 py-2 text-sm rounded"
            >
              Accept
            </Link>
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Manage Customer Bill", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel header="Manage Customer Bill" size="lg">
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        setSearch={setSearch}
        page={page}
        limit={limit}
        totalPages={totalPages}
        hasNext={billList?.pagination.hasNext}
        hasPrev={billList?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
      />
    </Panel>
  );
};

export default CustomerBillRequestList;
