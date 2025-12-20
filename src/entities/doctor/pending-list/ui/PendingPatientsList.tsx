import { useAuth } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import type { WSMessage } from "@/shared/hooks/use-web-socket/model/schema";
import { useWebSocket } from "@/shared/hooks/use-web-socket/model/useWebSocket";
import { AdminPendingPatientListApi } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  PendingDoctorPatientListApi,
  useGetDoctorPendingPatientListQuery,
} from "../api/query";
import { PATIENT_DATA_COL } from "./patient.data.col";

const PendingPatientsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetDoctorPendingPatientListQuery({
    page,
    limit,
    search,
  });
  const totalPages = patientList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  const wsUrl = import.meta.env.VITE_WS_URL;
  const { messages } = useWebSocket<WSMessage>(wsUrl, 5000);

  // useDoctorPendingPatientsSocketHandler({
  //   messages,
  //   page,
  //   limit,
  //   search,
  //   refetch,
  // });
  useEffect(() => {
    if (!messages.length) return;

    const lastMessage = messages[messages.length - 1];

    if (lastMessage.type === "stop_viewing_patient") {
      const targetPatientId = lastMessage.payload.patient_id;
      dispatch(
        PendingDoctorPatientListApi.util.updateQueryData(
          "getDoctorPendingPatientList",
          { page, limit, search },
          (draft) => {
            if (draft.data) {
              const index = draft.data.findIndex(
                (p) => p._id === targetPatientId
              );
              if (index !== -1) {
                draft.data.splice(index, 1);
              }
            }
          }
        )
      );
    }
    if (lastMessage.type === "submit_patient") {
      const targetPatientId = lastMessage.payload.patient_id;
      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { page, limit, search },
          (draft) => {
            if (draft.data) {
              draft.data = draft.data.filter((p) => p._id !== targetPatientId);
            }
          }
        )
      );
    }

    if (
      lastMessage.type === "back_view_patient" ||
      lastMessage.type === "new_xray_report" ||
      lastMessage.type === "select_doctor_and_update" ||
      lastMessage.type === "delete_patient_from_admin"
    ) {
      refetch();
    }
    console.log(lastMessage);
  }, [messages, dispatch, limit, search, page, refetch]);

  const { user } = useAuth();
  const DATA_TABLE = useMemo(
    () =>
      patientList?.data.map((item, index) => ({
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
        agent_name:
          user?.id &&
          Array.isArray(item.doctor_id) &&
          item.doctor_id.includes(user.id)
            ? item.agent_id?.email || ""
            : "",

        patient_name: item.name,
        patient_id: item.patient_id,
        xray_name: item.xray_name,
        action: "",
      })) || [],
    [patientList?.data, page, limit, user?.id]
  );

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}>
            <Link
              to={`/doctor/patient-view/${record?.key}`}
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
    <Panel header="Pending Report" size="lg">
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        setSearch={setSearch}
        page={page}
        limit={limit}
        totalPages={totalPages}
        hasNext={patientList?.pagination.hasNext}
        hasPrev={patientList?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
      />
    </Panel>
  );
};
export default PendingPatientsList;
