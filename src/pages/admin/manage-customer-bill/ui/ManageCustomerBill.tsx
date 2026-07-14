import { usePageTitle } from "@/shared/hooks";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { useGetCustomerListQuery } from "@/shared/redux/features/admin/manage-customer/customerListApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DOCTOR_DATA_COL } from "./updateDoctor.data.col";

const ManageCustomerBillByMonth = () => {

 const [visitedCustomers, setVisitedCustomers] = useState<Record<string, string>>(
  () => {
    const stored = JSON.parse(localStorage.getItem("visitedCustomers") || "{}");
    const expiry = localStorage.getItem("visitedCustomersExpiry");

    // 12 ঘন্টা পার হলে clear করো
    if (expiry && Date.now() > Number(expiry)) {
      localStorage.removeItem("visitedCustomers");
      localStorage.removeItem("visitedCustomersExpiry");
      return {};
    }

    return stored;
  }
);


  const { data: customerList, isLoading } = useGetCustomerListQuery();

  const DATA_TABLE = useMemo(
    () =>
      customerList
        ?.filter((item) => item.email !== "All")
        .map((item, index) => ({
          key: item._id,
          sl: index + 1,
          email: item.email,
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
    searchFields: ["email", "address"],
    rowsPerPage: 500,
  });
 
  const COLUMN = DOCTOR_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        
        ...item,
         
        render: (_: unknown, record?: DataSource, rowIndex?: number) => {
        const visitedTime = visitedCustomers[record?.key as string];  // ← add করো

        return (
          <div key={rowIndex} className="flex gap-2 items-center">
            {visitedTime && (
              <div className="flex flex-col">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                  Visited
                </span>
                <span className="text-xs text-gray-400 mt-0.5">
                  {visitedTime}
                </span>
              </div>
            )}
            <Link
              to={`/admin/manage-customer-bill-month/${record?.key}`}
              className="bg-yellow-500 text-white px-4 py-1 text-sm rounded"
             
              onClick={() => {
              const now = new Date().toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              const updated = { ...visitedCustomers, [record?.key as string]: now };
              localStorage.setItem("visitedCustomers", JSON.stringify(updated));

              // expiry না থাকলে set করো — 12 ঘন্টা
              if (!localStorage.getItem("visitedCustomersExpiry")) {
                const expiry = Date.now() + 12 * 60 * 60 * 1000;  // 12 hours
                localStorage.setItem("visitedCustomersExpiry", String(expiry));
              }

              setVisitedCustomers(updated);
            }}
            >
              View
            </Link>
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
    <Panel header={`Manage Customer Bill, Total= ${customerList?.length || 0}`} size="lg">
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
