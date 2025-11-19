 
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { CUSTOMER_DATA_COL } from "./manageCustomerBill.data.col";   
import { useGetBillRequestByMonthQuery } from "@/shared/redux/features/admin/customer-bill-request-list/billRequestApi";
import { usePageTitle } from "@/shared/hooks";

const CustomerBillRequestList = () => { 
 
    const { month } = useParams<{ month: string }>();
    const {
      data: billList,
      isLoading
    } = useGetBillRequestByMonthQuery(month!, { skip: !month });
  

  const DATA_TABLE = useMemo(
    () =>
      billList?.map((item, index) => ({
        key: item._id,
        sl: index + 1, 
        month:  item.month,  
        customer:  item.user_id.email,  
        total_patients:  item.total_patients,  
        total_amount:  item.total_amount,  
        status:  item.status,  
        paid_amount:  item.paid_amount,   
        payment_date: item.payment_date ? new Date(item.payment_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "—",
        received_number: item.received_number,
        action: "",
      })) || [],
    [billList]
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
    searchFields: ["customer"],
    rowsPerPage: 100,
  });

  const COLUMN = CUSTOMER_DATA_COL.map((item) => {
    if (item.key === "action"  )  {
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
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by customer"
          />
        </div>

        <Table
          loading={isLoading}
          columns={COLUMN}
          dataSource={paginatedData}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </Panel>
  );
};

export default CustomerBillRequestList;
