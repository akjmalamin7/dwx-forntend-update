import { CustomerUpdateBillAction } from "@/features";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { useGetAdminCustomerReportListQuery } from "@/shared/redux/features/admin/customer-bill-update/customerReportListApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const CustomerUpdateBill = () => {
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("userId") ?? "";
  const month = searchParams.get("month") ?? "";

  const { data: patientList, isLoading } = useGetAdminCustomerReportListQuery({
    userId,
    month,
  });

  const DATA_TABLE = useMemo(
    () =>
      patientList?.map((item, index) => ({
        key: item._id,
        sl: index + 1,
        username: item.agent_id.email,
        xray_name: item.xray_name,
        image_type: item.image_type,
        month: item.month_year,
        view: "",
        action: "",
      })) || [],
    [patientList]
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
    searchFields: ["xray_name"],
    rowsPerPage: 100,
  });

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "view") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}>
            <Link
              to={`/admin/patient-view/${record?.key}`}
              className="bg-yellow-500 text-white px-2 py-2 text-sm"
            >
              View
            </Link>
          </div>
        ),
      };
    }

    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => {
          const originalItem = patientList?.find(
            (item) => item._id === record?.key
          );
          return (
            <div key={rowIndex}>
              <CustomerUpdateBillAction
                defaultValue={(record?.image_type ?? "") as string}
                name="image_type"
                id={originalItem?._id}
              />
            </div>
          );
        },
      };
    }
    return item;
  });

  return (
    <Panel header="Update Customer Bill" size="lg">
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Xray Name..."
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

export default CustomerUpdateBill;
