import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import type { WSMessage } from "@/shared/hooks/use-web-socket/model/schema";
import { useWebSocket } from "@/shared/hooks/use-web-socket/model/useWebSocket";
import { useGetPendingPatientListQuery } from "@/shared/redux/features/agent/pending-patient-list/pendingPatientListApi";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAgentPendingPateintsSocketHandler } from "../model/useAgentPendingPatientsSocketHandler";
import { PATIENT_DATA_COL } from "./patient.data.col";

const Patients = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });

  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetPendingPatientListQuery({ page, limit, search });
  const totalPages = patientList?.pagination.totalPages || 1;
  const wsUrl = import.meta.env.VITE_WS_URL;
  const { messages, clearMessages, isOpen } = useWebSocket<WSMessage>(
    wsUrl,
    5000
  );
  useAgentPendingPateintsSocketHandler({
    messages,
    clearMessages,
    page,
    limit,
    search,
    isOpen,
    refetch,
  });

  // Prepare data
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  const DATA_TABLE = useMemo(
    () =>
      patientList?.data?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        start_time: new Date(item.createdAt).toLocaleString(),
        patient_age: item.age,
        patient_name: item.name,
        patient_id: item.patient_id,
        patient_sex: item.gender,
        xray_name: item.xray_name,
        type: item.rtype,
        selected_dr:
          Array.isArray(item.doctor_id) && item.doctor_id.length > 0
            ? item.doctor_id.map((d) => d.email).join(", ")
            : "All",
        ignore_dr:
          Array.isArray(item.ignore_dr) && item.ignore_dr.length > 0
            ? item.ignore_dr.map((d) => d.email).join(", ")
            : "",
        online_dr: item.online_dr?.email || "",
        action: "",
      })) || [],
    [patientList?.data, limit, page]
  );

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

export default Patients;
