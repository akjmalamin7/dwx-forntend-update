import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetDoctorAllCompletedPatientListQuery } from "../api/query";
import { PATIENT_DATA_COL } from "./patient.data.col";

const AllCompletedPatientList = () => {
  const { page, limit, setPage } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const { data: patientList, isLoading } =
    useGetDoctorAllCompletedPatientListQuery({ page, limit });
  const totalPages = patientList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      patientList?.data?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        end_time: new Date(item.completed_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        patient_age: item.age,
        patient_name: item.name,
        patient_id: item.patient_id,
        patient_sex: item.gender,
        xray_name: item.xray_name,
        printstatus: item.printstatus || "Waiting",
        action: "",
      })) || [],
    [patientList?.data, page, limit]
  );

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
  return (
    <Panel header="This Month All Completed Report" size="lg">
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        page={page}
        totalPages={totalPages}
        hasNext={patientList?.pagination.hasNext}
        hasPrev={patientList?.pagination.hasPrev}
        setPage={setPage}
      />
    </Panel>
  );
};

export default AllCompletedPatientList;
