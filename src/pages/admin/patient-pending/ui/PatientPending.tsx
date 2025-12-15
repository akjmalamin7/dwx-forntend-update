import { DeleteAdminPatient, TypingBack } from "@/features";
import { useAuth } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useWebSocket } from "@/shared/hooks/use-web-socket/useWebSocket";
import type { ADMIN_TRANSFORM_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";
import { PendingPatientListApi, useGetPendingPatientListQuery } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

type WSMessage = {
  type: "new_xray_report";
  payload: ADMIN_TRANSFORM_PENDING_PATIENT_MODEL["data"][number];
};

const ENDPOINTS = {
  PENDING_PATIENT_LIST: "getPendingPatientList" as const,
};

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

  useEffect(() => {
    if (!messages.length) return;

    messages.forEach((msg) => {
      if (msg.type === "new_xray_report") {
        dispatch(
          PendingPatientListApi.util.updateQueryData(
            ENDPOINTS.PENDING_PATIENT_LIST,
            { page: 1, limit, search: "" },
            (draft: ADMIN_TRANSFORM_PENDING_PATIENT_MODEL) => {
              const exists = draft.data.find((d) => d._id === msg.payload._id);
              if (!exists) {
                draft.data.unshift(msg.payload);
                if (draft.data.length > limit) draft.data.pop();
              }
            }
          )
        );
      }
    });

    clearMessages();
  }, [messages, limit, dispatch, clearMessages]);

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
          <div key={rowIndex} className="flex gap-2">
            <TypingBack path={record?.key} onDeleteSuccess={refetch} />
            <Link
              to={`/admin/select-doctor/${record?.key}`}
              className="bg-blue-500 text-white px-2 py-1 text-sm rounded"
            >
              S.D
            </Link>
            <Link
              to={`/admin/patient-view/${record?.key}`}
              className="bg-yellow-500 text-white px-2 py-1 text-sm rounded"
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
