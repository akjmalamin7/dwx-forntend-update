import { useAuth, usePageTitle } from "@/shared/hooks";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { useGetPendingPatientListQuery } from "@/shared/redux/features/agent/pending-patient-list/pendingPatientListApi";
import { Pagination, Panel, Search, Text } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const Patients = () => {
  const { data: patientList, isLoading } = useGetPendingPatientListQuery();
  const { user } = useAuth();
  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      patientList?.map((item, index) => ({
        key: item._id,
        sl: index + 1,
        start_time: new Date(item.createdAt).toLocaleString(),
        patient_age: item.age,
        patient_name: item.name,
        patient_id: item.patient_id,
        patient_sex: item.gender,
        xray_name: item.xray_name,
        type: item.rtype, 
        selected_dr: Array.isArray(item.doctor_id) && item.doctor_id.length > 0
            ? item.doctor_id.map((d) => d.email).join(", ")
            : "All",
        ignore_dr:
          Array.isArray(item.ignore_dr) && item.ignore_dr.length > 0
            ? item.ignore_dr.map((d) => d.email).join(", ")
            : "",
        online_dr: item.online_dr?.email || "",
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
    rowsPerPage: 20,
  });

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex items-center gap-[6px]">
         

            <Link
              to={`/agent/patient-edit/${record?.key}`}
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              Edit
            </Link>
 
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Pending Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });


  return (
    <Panel header="Pending Report" size="lg">
      <div className="w-1/3">
      {user?.role === "user" ? (
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by Name, ID or Xray..."
        />
      ) : (
        <Text color="danger">Role not matched</Text>
      )}
      </div>

      <Table loading={isLoading} columns={COLUMN} dataSource={paginatedData} />

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

export default Patients;
