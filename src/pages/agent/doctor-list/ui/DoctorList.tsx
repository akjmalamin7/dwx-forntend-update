import { AgentFormError } from "@/features/agent/agent-form-error";
import { usePageTitle } from "@/shared/hooks";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { useActiveUser } from "@/shared/hooks/use-active-user";
import { useGetDoctorListQuery } from "@/shared/redux/features/agent/doctor-list/doctorListApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import { useMemo } from "react";
import { DOCTOR_DATA_COL } from "./doctor.data.col";

const DoctorList = () => {
  const { data: DoctorList, isLoading } = useGetDoctorListQuery();
  const SKIPPED_IDS = ["686b95c980aa4c941420dcf2", "686b95c980aa4c941420dd1f"];
  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      DoctorList?.filter((item) => item.email !== "All")
        .filter((item) => !SKIPPED_IDS.includes(item._id))
        .map((item, index) => ({
          key: item._id,
          sl: index + 1,
          name: item.email,
          role: item.role === "xray_dr" ? "Radiology" : "ECG",
          address: item.address,
          action: "",
        })) || [],
    [DoctorList],
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

  usePageTitle("Doctor List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
  const { status } = useActiveUser();
  if (status !== "active") {
    return (
      <AgentFormError title="Something went wrong!. Please contact with support." />
    );
  }
  return (
    <Panel header="Doctor List" size="md">
      <div className="w-1/3">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by Name"
        />
      </div>

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
