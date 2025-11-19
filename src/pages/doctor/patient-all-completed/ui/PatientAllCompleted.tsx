import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { useGetAllCompletedPatientListQuery } from "@/shared/redux/features/doctor/all-completed-patient-list/allCompletedPatientListApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";
import { usePageTitle } from "@/shared/hooks";

const PatientAllCompleted = () => {
  const { data: patientList, isLoading } = useGetAllCompletedPatientListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      patientList?.map((item, index) => ({
        key: item._id,
        sl: index + 1, 
        end_time: new Date(item.completed_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        patient_age: item.age,
        patient_name: item.name,
        patient_id: item.patient_id,
        patient_sex: item.gender,
        xray_name: item.xray_name,
        printstatus: item.printstatus || "Waiting",
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
    searchFields: ["patient_name", "patient_id", "xray_name"],
    rowsPerPage: 10,
  });

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}>
            <Link
              to={`/doctor/completed-patient-view/${record?.key}`}
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              View
            </Link> 
          </div>
        ),
      };
    }
    return item;
  });


  usePageTitle("This Month All Completed Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
  
  return (
    <Panel header="This Month All Completed Report" size="lg">
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Name, ID or Xray..."
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

export default PatientAllCompleted;
