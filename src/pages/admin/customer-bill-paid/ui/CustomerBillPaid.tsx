import { useGetCustomerBillPaidByMonthQuery } from "@/entities/admin/bill/api/query";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom"; 
import { CUSTOMER_DATA_COL } from "./manageCustomerBill.data.col";

 

const CustomerBillPaid = () => { 
  const { month } = useParams<{ month: string }>();
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 100,
  });
  const { data: billList, isLoading } = useGetCustomerBillPaidByMonthQuery({
    page,
    limit, 
    search,
    month
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
        key: item._id || `fallback-key-${index}`,
        sl: (page - 1) * limit + index + 1,
        month: item.month,
        user_id: item.user_id,
        customer: item.user_id.email || "", 
        total_amount: ((item.total_amount || 0) * 1.018).toFixed(0),
        status: (item.total_amount || 0) === 0 ? null : item.status,
        paid_amount: item.paid_amount,
        hasPendingHistory: item.hasPendingHistory,
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
    [billList?.data, limit, page],
  );


  
  // ---- Footer totals ----
  const totals = billList?.data.reduce(
    (acc, item) => ({
      total_amount: acc.total_amount + (item.total_amount || 0), 
      paid_amount: acc.paid_amount + (item.paid_amount || 0), 
    }),
    {   total_amount: 0,  paid_amount: 0, }
  );
 
  
  const FOOTER_ROW = [
    {
      key: "footer",
      sl: "Total",
      month: "", 
      status: "",
      total_amount:  (totals?.total_amount || 0).toFixed(0) ,
      paid_amount:  (totals?.paid_amount || 0).toFixed(0) ,
      payment_date: "", 
      received_number: "",  
      bill_status: "",  
      bill_action: "",  
      isFooter: true, 
    },
  ];

  const DATA_TABLE_WITH_FOOTER = [
    ...(DATA_TABLE || []),
    ...FOOTER_ROW,
  ];


  const COLUMN = CUSTOMER_DATA_COL.map((item) => {

    if (item.key === "status") {
    return {
      ...item,
      render: (_: unknown, record?: DataSource) => {
        const status = record?.status;
        if (!status) return <span className="text-gray-400">—</span>;
        return (
          <span
            className={
              status === "Paid"
                ? "text-green-600 font-semibold"
                : status === "Pending"
                  ? "text-yellow-500 font-semibold"
                  : "text-gray-600"
            }
          >
            {String(status)}
          </span>
        );
      },
    };
  }
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => { 
        const hasAmount = Number(record?.total_amount) > 0; 
        const isFooter = record?.isFooter;  

        if (isFooter) return null;

        //if (!hasAmount) return null;
          return (
            <div key={rowIndex} className="flex gap-2"> 

              {/* PRINT BUTTON */}
              {hasAmount &&  (
                <Link
                  to={`/admin/customer-print-bill/${record?.key}`}
                  className="bg-green-500 text-white px-4 py-1 text-sm rounded"
                  
                >
                  Print
                </Link>
              )}

            
            </div>
          );
        },
      };
    } 



    return {
      ...item,
      render: (_: unknown, record?: DataSource, rowIndex?: number) => {
        const value = record?.[item.key as keyof DataSource];

        if (record?.isFooter) {
          return <strong>{String(value ?? "")}</strong>;
        }
    
        if (item.render) {
          return item.render(value, record, rowIndex);
        }

          return <span>{String(value ?? "")}</span>;
        },
    };

  });

  usePageTitle("Manage Customer Bill Paid", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <>
      <Panel header={`Manage Customer Paid Bill Total= ${billList?.pagination.total || 0}`} size="lg">
        <DataTable
          isLoading={isLoading}
          column={COLUMN} 
          search={search}
          setSearch={setSearch}
          page={page}
          limit={limit}
          totalPages={totalPages}
          hasNext={billList?.pagination.hasNext}
          hasPrev={billList?.pagination.hasPrev}
          setPage={setPage}
          setLimit={setLimit}
          dataSource={DATA_TABLE_WITH_FOOTER}
        />
      </Panel>
    </>
  );
};

export default CustomerBillPaid;
