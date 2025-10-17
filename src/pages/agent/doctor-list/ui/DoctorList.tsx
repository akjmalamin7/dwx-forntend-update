import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { useGetDoctorListQuery } from "@/shared/redux/features/agent/doctor-list/doctorListApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import { useMemo } from "react";
import { DOCTOR_DATA_COL } from "./doctor.data.col";

const DoctorList = () => {
  const { data: DoctorList, isLoading } = useGetDoctorListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      DoctorList?.filter((item) => item.email !== "All").map((item, index) => ({
        key: item._id,
        sl: index + 1,
        name: item.email,
        mobile: item.mobile,
        role: item.role === "xray_dr" ? "Radiology" : "ECG",
        address: item.address,
        action: "",
      })) || [],
    [DoctorList]
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

  return (
    <Panel header="Doctor List" size="lg">
      <Search
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by Name"
      />

      <Table
        loading={isLoading}
        columns={DOCTOR_DATA_COL}
        dataSource={paginatedData}
      />

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

export default DoctorList;
