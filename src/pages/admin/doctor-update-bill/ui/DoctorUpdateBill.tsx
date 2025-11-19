import { DoctorUpdateBillAction } from "@/features";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { useGetAdminDoctorReportListQuery } from "@/shared/redux/features/admin/doctor-update-bill/doctorReportListApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";
import { usePageTitle } from "@/shared/hooks";

const DoctorUpdateBill = () => {
  const [searchParams] = useSearchParams();

  const doctorId = searchParams.get("doctorId") ?? "";
  const month = searchParams.get("month") ?? "";

  const { data: patientList, isLoading } = useGetAdminDoctorReportListQuery({
    doctorId,
    month,
  });

  const DATA_TABLE = useMemo(
    () =>
      patientList?.map((item, index) => ({
        key: item._id,
        sl: index + 1,
        email: item.username,
        xray_name: item.xray_name,
        image_type: item.image_type,
        month: item.month,
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
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => {
          const originalItem = patientList?.find(
            (item) => item._id === record?.key
          );

          return (
            <div key={rowIndex}>
              <DoctorUpdateBillAction
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


  usePageTitle("Update Doctor Bill", {
        prefix: "DWX - ",
        defaultTitle: "DWX",
        restoreOnUnmount: true,
      });


  return (
    <Panel header="Update Doctor Bill" size="lg">
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Patient Name, ID or DC Name..."
          />
        </div>

        <Table
          scroll={true}
          size="md"
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

export default DoctorUpdateBill;
