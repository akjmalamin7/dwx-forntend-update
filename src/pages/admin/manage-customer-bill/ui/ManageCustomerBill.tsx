 
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DOCTOR_DATA_COL } from "./updateDoctor.data.col";   
import { useGetCustomerListQuery } from "@/shared/redux/features/admin/manage-customer/customerListApi";
import { usePageTitle } from "@/shared/hooks";

const ManageCustomerBillByMonth = () => {
  const { data: customerList, isLoading } = useGetCustomerListQuery();
 
  const DATA_TABLE = useMemo(
    () =>
      customerList?.filter((item) => item.email !== "All").map((item, index) => ({
        key: item._id,
        sl: index + 1, 
        email:  item.email, 
        address: item.address, 
        action: "",
      })) || [],
    [customerList]
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
    searchFields: ["email","address"],
    rowsPerPage: 50,
  });

  const COLUMN = DOCTOR_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}> 
             <Link
              to={`/admin/manage-customer-bill-month/${record?.key}`}
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
