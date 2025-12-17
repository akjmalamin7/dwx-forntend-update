import { DeleteAdminPatient, TypingBack } from "@/features";
import { useAuth } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useWebSocket } from "@/shared/hooks/use-web-socket/useWebSocket";
import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";
import { useGetPendingPatientListQuery } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";
import { useRealtimeRTKQuerySync } from "./useRealTimeRtkQuerySync";

type WSMessage = {
  type: string;
  payload: Partial<ADMIN_PENDING_PATIENT_MODEL>;
};

// ================== ADD transformWsPatient ==================
const transformWsPatient = (
  payload: Partial<ADMIN_PENDING_PATIENT_MODEL>
): ADMIN_PENDING_PATIENT_MODEL => {
  return {
    key: payload._id,
    _id: payload._id!,
    id: payload._id!,
    patient_id: payload.patient_id ?? "",
    name: payload.name ?? "",
    age: payload.age ?? "",
    gender: payload.gender ?? "",
    rtype: payload.rtype ?? "",
    xray_name: payload.xray_name ?? "",
    status: payload.status ?? "pending",
    history: payload.history ?? "",
    ref_doctor: payload.ref_doctor ?? "",
    image_type: payload.image_type ?? "",
    soft_delete: payload.soft_delete ?? "no",
    month_year: payload.month_year ?? "",
    completed_time: payload.completed_time ?? "",
    logged: payload.logged ?? null,
    printstatus: payload.printstatus ?? null,
    study_for: payload.study_for ?? "",
    viewed: payload.viewed ?? false,
    createdAt: payload.createdAt ?? new Date().toISOString(),
    updatedAt: payload.updatedAt ?? new Date().toISOString(),
    __v: payload.__v ?? 0,

    agent_id: {
      _id: payload.agent_id?._id ?? "",
      email: payload.agent_id?.email ?? "",
      id: payload.agent_id?.id ?? "",
    },
    doctor_id: payload.doctor_id ?? [],
    ignore_dr: payload.ignore_dr ?? [],
    completed_dr: payload.completed_dr ?? [],
    online_dr: {
      _id: payload.online_dr?._id ?? "",
      email: payload.online_dr?.email ?? "",
      id: payload.online_dr?.id ?? "",
    },
    is_checked: payload.is_checked ?? null,
  };
};
// ============================================================

const PatientPending = () => {
  const dispatch: AppDispatch = useDispatch();
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });

  const { data: patientList, isLoading, refetch } = useGetPendingPatientListQuery({
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
  const { messages, clearMessages } = useWebSocket<WSMessage>(wsUrl, 5000);
  const { user } = useAuth();

  useRealtimeRTKQuerySync<ADMIN_PENDING_PATIENT_MODEL, { page: number; limit: number; search: string }>({
    wsMessages: messages,
    clearMessages,
    endpoint: "getPendingPatientList",
    queryArgs: { page, limit, search },
    page,
    limit,
    dispatch,
    transformPayload: transformWsPatient, // normalize
  });



  const DATA_TABLE = useMemo(
    () =>
      patientList?.data?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        start_time: new Date(item.createdAt).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        agent_name: item.agent_id?.email,
        patient_name: item.name,
        patient_id: item.patient_id,
        gender: item.gender,
        age: item.age,
        rtype: item.rtype,
        selected_dr:
          user?.id && Array.isArray(item.doctor_id) && item.doctor_id.length > 0
            ? item.doctor_id.map((d) => d.email).join(", ")
            : "All",
        ignored_dr:
          Array.isArray(item.ignore_dr) && item.ignore_dr.length > 0
            ? item.ignore_dr.map((d) => d.email).join(", ")
            : "",
        online_dr: item.online_dr?.email,
        xray_name: item.xray_name,
        action: "",
      })) || [],
    [patientList?.data, user?.id, limit, page]
  );

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex">
            <TypingBack path={record?.key} onDeleteSuccess={refetch} />
            <Link
              to={`/admin/select-doctor/${record?.key}`}
              className="bg-blue-500 text-white px-2 py-2 text-sm"
            >
              S.D
            </Link>
            <Link
              to={`/admin/patient-view/${record?.key}`}
              className="bg-yellow-500 text-white px-2 py-2 text-sm"
            >
              View
            </Link>
            <DeleteAdminPatient id={record?.key} onDeleteSuccess={refetch} />
          </div>
        ),
      };
    }
    return item;
  });

  return (
    <Panel header="Pending Patients" size="lg">
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

export default PatientPending;
