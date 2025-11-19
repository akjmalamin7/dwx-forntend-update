import { CompletedBack, DeleteAdminPatient } from "@/features";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination"; 
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";
import { useGetArchivePatientListQuery } from "@/shared/redux/features/admin/patient-archive/archivePatientListApi";
import { usePageTitle } from "@/shared/hooks";

const PatientCompleted = () => {
  const { month } = useParams<{ month: string }>();

  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetArchivePatientListQuery(month);
  const DATA_TABLE = useMemo(
    () =>
      patientList?.map((item, index) => ({
        key: item._id,
        sl: index + 1,
        start_time: new Date(item.completed_time).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        agent_name: item.agent_id?.email,
        patient_name: item.name,
        patient_id: item.patient_id,
        age: item.age,
        rtype: item.rtype,

        completed_dr: item.completed_dr?.email,
        xray_name: item.xray_name,
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
    searchFields: ["patient_name", "patient_id", "agent_name"],
    rowsPerPage: 200,
  });

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex justify-end">
            <Link
              to={`/admin/patient-view/${record?.key}`}
              className="bg-green-500 text-white px-2 py-2 text-sm"
            >
              View
            </Link>
        
            <CompletedBack path={record?.key} onDeleteSuccess={refetch} />
            <DeleteAdminPatient id={record?.key} onDeleteSuccess={refetch} />
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Archive Completed Report", {
        prefix: "DWX - ",
        defaultTitle: "DWX",
        restoreOnUnmount: true,
      });
      
  return (
    <Panel header="Archive Completed Report" size="lg">
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Patient Name, ID or DC Name..."
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

export default PatientCompleted;
