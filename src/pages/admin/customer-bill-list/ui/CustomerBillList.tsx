import { useGetCustomerBillListByMonthQuery } from "@/entities/admin/bill/api/query";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import BillHistory from "./bill-history/BillHistory";
import { CUSTOMER_DATA_COL } from "./manageCustomerBill.data.col";
interface CustomerBillRow extends DataSource {
  user_id: {
    _id: string;
    email: string;
    id: string;
  };
}
const CustomerBillList = () => {
  const { month } = useParams<{ month: string }>();
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 100,
  });
  const { data: billList, isLoading } = useGetCustomerBillListByMonthQuery({
    page,
    limit,
    month,
    search,
  });
  const matchHasPendigHistory = (id: string | undefined) => {
    if (!id) return false;
    return !!billList?.data.find(
      (bill) => bill.user_id._id === id && bill.hasPendingHistory
    );
  };

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
        user_id: item.user_id,
        customer: item.user_id.email || "",
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
        render: (_: unknown, record?: DataSource, rowIndex?: number) => {
          const customerRecord = record as CustomerBillRow;
            const disabled = !customerRecord?.key;
          return (
            <div key={rowIndex} className="flex gap-2">
              <BillHistory
                buttonAction={
                  !matchHasPendigHistory(customerRecord.user_id?._id)
                }
                userId={customerRecord.user_id?._id}
              />

                 {/* PRINT BUTTON */}
            {disabled ? (
              <button
                disabled
                className="bg-gray-300 text-gray-500 px-4 py-2 text-sm rounded cursor-not-allowed"
              >
                Print
              </button>
            ) : (
              <Link
                to={`/admin/customer-print-bill/${customerRecord.key}`}
                className="bg-green-500 text-white px-4 py-2 text-sm rounded"
              >
                Print
              </Link>
            )}

            {/* PAY BUTTON */}
            {disabled ? (
              <button
                disabled
                className="bg-gray-300 text-gray-500 px-4 py-2 text-sm rounded cursor-not-allowed"
              >
                Pay
              </button>
            ) : (
              <Link
                to={`/admin/customer-pay-bill/${customerRecord.key}`}
                className="bg-blue-500 text-white px-4 py-2 text-sm rounded"
              >
                Pay
              </Link>
            )}


           {/* ACCEPT BUTTON */}
            {disabled ? (
              <button
                disabled
                className="bg-gray-300 text-gray-500 px-4 py-2 text-sm rounded cursor-not-allowed"
              >
                Accept
              </button>
            ) : (
             <Link
                to={`/admin/customer-pay-bill/${customerRecord.key}`}
                className="bg-blue-500 text-white px-4 py-2 text-sm rounded"
              >
                Accept
              </Link>
            )} 

 
            </div> 
          );
        },
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
    <>
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
    </>
  );
};

export default CustomerBillList;
