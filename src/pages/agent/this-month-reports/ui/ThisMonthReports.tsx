import { useGetAgendAllCompletedPatientListQuery } from "@/entities/agent/this-month-reports/api";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const ThisMonthReports = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });

  const { data: patientList, isLoading } =
    useGetAgendAllCompletedPatientListQuery({ page, limit, search });
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
        start_time: new Date(item.createdAt).toLocaleString([], {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
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
        type: item.rtype,
        viewed: item.completed_dr?.email || "",
        printstatus: item.printstatus || "Waiting",
        action: "",
      })) || [],
    [patientList?.data, limit, page]
  );

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}>
            <Link
              to={`/agent/patient-view/${record?.key}`}
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              View
            </Link>
            <Link
              to={`/agent/patient-print/${record?.key}`}
              className="bg-yellow-500 ml-2 text-white px-2 py-1 rounded text-sm"
            >
              Print
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
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        page={page}
        totalPages={totalPages}
        hasNext={patientList?.pagination.hasNext}
        hasPrev={patientList?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
      />
    </Panel>
  );
};

export default ThisMonthReports;
