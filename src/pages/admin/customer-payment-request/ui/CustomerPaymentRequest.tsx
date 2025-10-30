 
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DOCTOR_DATA_COL } from "./updateDoctor.data.col";    
import { useGetBillMonthListQuery } from "@/shared/redux/features/admin/customer-bill-request-month/billMonthListApi";

const ManageCustomerBillByMonth = () => {
  const { data: monthList, isLoading } = useGetBillMonthListQuery();
 
  const DATA_TABLE = useMemo(
    () =>
      monthList?.map((item, index) => ({
        key: '',
        sl: index + 1, 
        month:  item.month,  
        action: "",
      })) || [],
    [monthList]
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
    rowsPerPage: 48,
  });

  const COLUMN = DOCTOR_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}> 
             <Link
              to={`/admin/customer-bill-request/${record?.month}`}
              className="bg-yellow-500 text-white px-4 py-2 text-sm rounded"
            >
              View
            </Link>
            
          </div>
        ),
      };
    }
    return item;
  });

  return (
    <Panel header="Customer Payment Request" size="md">
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Customer, Address"
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

export default ManageCustomerBillByMonth;
