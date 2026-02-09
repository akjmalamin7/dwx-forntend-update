import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useAgentCompedPatientSocket } from "@/shared/hooks/use-socket/useAgentCompletedSocket";
import { useGetAgentCompletedPatientListQuery } from "@/shared/redux/features/agent/completed-patient-list/completedPatientListApi";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const PatientCompleted = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 100,
  });

  const {
    data: patientList,
    isLoading,
    // refetch,
  } = useGetAgentCompletedPatientListQuery(
    { page, limit, search },
    { pollingInterval: 5 * 60 * 1000, refetchOnMountOrArgChange: true }
  );

  const totalPages = patientList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  const wsUrl = import.meta.env.VITE_WS_URL;
  const { mergedPatientData, resetRealtime } = useAgentCompedPatientSocket({
    wsUrl,
    page,
    apiPatients: patientList?.data,
  });
  useEffect(() => {
    resetRealtime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);
  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      mergedPatientData?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1, 

         start_time: new Date(item.createdAt).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }) + " <br/> " + new Date(item.completed_time).toLocaleString([], {
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
    [mergedPatientData, limit, page]
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

  usePageTitle("Completed Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel header="Completed Report" size="lg">
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

export default PatientCompleted;
