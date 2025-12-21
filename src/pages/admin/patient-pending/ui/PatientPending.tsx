import { DeleteAdminPatient, TypingBack } from "@/features";
import { useAuth } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import type { WSMessage } from "@/shared/hooks/use-web-socket/model/schema";
import { useWebSocket } from "@/shared/hooks/use-web-socket/model/useWebSocket";
import {
  AdminPendingPatientListApi,
  useGetPendingPatientListQuery,
} from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTransformPatient } from "../model/useTransformPatient";
import { PATIENT_DATA_COL } from "./patient.data.col";

// ============================================================
interface OnlineDoctor {
  _id: string;
  email: string;
  id?: string;
}
const PatientPending = () => {
  const [onlineDoctorsMap, setOnlineDoctorsMap] = useState<
    Record<string, OnlineDoctor>
  >({});
  const { extractPatientPayload, transformWsPatient } = useTransformPatient();
  const dispatch: AppDispatch = useDispatch();
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });

  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetPendingPatientListQuery({
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
  const { messages, sendMessage, clearMessages, isOpen } =
    useWebSocket<WSMessage>(wsUrl, 5000);
  const { user } = useAuth();

  useEffect(() => {
    if (!messages.length || !isOpen) return;
    messages.forEach((msg) => {
      if (msg.type === "new_xray_report") {
        const rawPatient = extractPatientPayload(msg.payload);
        if (!rawPatient) {
          console.warn("Invalid WS payload:", msg);
          return;
        }

        const newData = transformWsPatient(rawPatient);
        dispatch(
          AdminPendingPatientListApi.util.updateQueryData(
            "getPendingPatientList",
            { page, limit, search },
            (draft) => {
              const exists = draft.data.some((p) => p._id === newData._id);
              if (!exists) {
                draft.data.unshift(newData);
              }
            }
          )
        );
      }

      if (msg.type === "view_online_doctor") {
        const { patient_id: wsPatientId, doctor } = msg.payload;
        console.log(msg.payload);
        setOnlineDoctorsMap((prev) => ({
          ...prev,
          [wsPatientId]: doctor,
        }));
        dispatch(
          AdminPendingPatientListApi.util.updateQueryData(
            "getPendingPatientList",
            { page, limit, search },
            (draft) => {
              const patient = draft.data.find((p) => p._id === wsPatientId);
              if (patient) {
                patient.online_dr = {
                  _id: doctor._id,
                  email: doctor.email,
                  id: doctor.id ?? "",
                };
              }
            }
          )
        );
      }
      if (msg.type === "back_view_patient") {
        const wsPatientId = msg.payload?.patient_id;
        setOnlineDoctorsMap((prev) => {
          const updatedMap = { ...prev };
          delete updatedMap[wsPatientId];
          return updatedMap;
        });

        dispatch(
          AdminPendingPatientListApi.util.updateQueryData(
            "getPendingPatientList",
            { page, limit, search },
            (draft) => {
              const patient = draft.data.find((p) => p._id === wsPatientId);
              if (patient) {
                patient.online_dr = { _id: "", email: "", id: "" };
              }
            }
          )
        );
      }
      if (msg.type === "delete_patient_from_admin") {
        const deletedId = msg.payload.patient_id;

        dispatch(
          AdminPendingPatientListApi.util.updateQueryData(
            "getPendingPatientList",
            { page, limit, search },
            (draft) => {
              draft.data = draft.data.filter((p) => p._id !== deletedId);
            }
          )
        );
      }
      if (msg.type === "submit_patient") {
        const deletedId = msg.payload.patient_id;

        dispatch(
          AdminPendingPatientListApi.util.updateQueryData(
            "getPendingPatientList",
            { page, limit, search },
            (draft) => {
              draft.data = draft.data.filter((p) => p._id !== deletedId);
            }
          )
        );
      }
    });

    clearMessages();
  }, [
    messages,
    dispatch,
    limit,
    page,
    search,
    clearMessages,
    extractPatientPayload,
    transformWsPatient,
    isOpen,
  ]);

  const DATA_TABLE = useMemo(
    () =>
      patientList?.data?.map((item, index) => {
        const liveDoctor = onlineDoctorsMap[item._id];
        return {
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
            user?.id &&
            Array.isArray(item.doctor_id) &&
            item.doctor_id.length > 0
              ? item.doctor_id.map((d) => d.email).join(", ")
              : "All",
          ignored_dr:
            Array.isArray(item.ignore_dr) && item.ignore_dr.length > 0
              ? item.ignore_dr.map((d) => d.email).join(", ")
              : "",
          online_dr: liveDoctor
            ? liveDoctor.email
            : item.online_dr?.email || "",
          xray_name: item.xray_name,
          action: "",
        };
      }) || [],
    [patientList?.data, user?.id, limit, page, onlineDoctorsMap]
  );

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex">
            <TypingBack
              path={record?.key}
              sendMessage={sendMessage}
              onDeleteSuccess={refetch}
            />
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
            <DeleteAdminPatient
              id={record?.key}
              sendMessage={sendMessage}
              onDeleteSuccess={refetch}
            />
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
