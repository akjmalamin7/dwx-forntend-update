import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, PanelHeading, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react"; 
import { PAYMENT_DATA_COL } from "./payment.data.col"; 
import { useGetPaymentListQuery } from "@/shared/redux/features/admin/payment/paymentApi";
import DeletePayment from "@/features/delete-payment/DeletePayment";
import { usePageTitle } from "@/shared/hooks";


const PaymentList = () => {
  const { data: PaymentList, isLoading, refetch } = useGetPaymentListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      PaymentList?.map((item, index) => ({
        key: item.id,
        sl: index + 1,
        name: item.name,
        details: item.details,
        action: "",
      })) || [],
    [PaymentList]
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
    searchFields: ["name"],
    rowsPerPage: 100,
  });

  const COLUMN = PAYMENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex gap-2"> 
            <DeletePayment id={record?.key} onDeleteSuccess={refetch} />
          </div>
        ),
      };
    }
    return item;
  });


  usePageTitle("Payment List", {
        prefix: "DWX - ",
        defaultTitle: "DWX",
        restoreOnUnmount: true,
      });

      
  return (
    <Panel
      header={
        <PanelHeading
          title="Payment List"
          button="Payment Add"
          path="/admin/payment-add"
        />
      }
      size="md"
    >
      <div className="w-1/3">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by Name"
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

export default PaymentList;
