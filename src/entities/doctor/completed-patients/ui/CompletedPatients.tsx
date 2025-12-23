import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { useAppDispatch } from "@/shared/hooks/use-dispatch/useAppDispatch";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import type {
  AdminMrDeleteBack,
  WSMessage,
} from "@/shared/hooks/use-web-socket/model/schema";
import { useWebSocket } from "@/shared/hooks/use-web-socket/model/useWebSocket";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  DoctorCompletedPatientListApi,
  useGetDoctorCompletedPatientListQuery,
} from "../api/query";
import { PATIENT_DATA_COL } from "./patient.data.col";
interface DoctorBasicInfo {
  _id: string;
  id?: string;
  email?: string;
  [key: string]: unknown;
}
const CompletedPatients = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetDoctorCompletedPatientListQuery({ page, limit, search });
  const totalPages = patientList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  const dispatch: AppDispatch = useAppDispatch();
  const wsUrl = import.meta.env.VITE_WS_URL;
  const { messages, clearMessages } = useWebSocket<WSMessage>(wsUrl, 5000);
  const isDoctorObj = (val: unknown): val is DoctorBasicInfo => {
    return typeof val === "object" && val !== null && "_id" in val;
  };

  const transformDeleteBackValue = useCallback((payload: AdminMrDeleteBack) => {
    if (!payload || !payload.patient) {
      throw new Error("Invalid WS patient payload");
    }

    const p = payload.patient;

    return {
      ...p,
      key: p._id,

      agent_id: isDoctorObj(p.agent_id) ? p.agent_id._id : String(p.agent_id),

      completed_dr: isDoctorObj(p.completed_dr)
        ? [
            {
              _id: p.completed_dr._id,
              id: p.completed_dr.id || p.completed_dr._id,
              email: p.completed_dr.email || "",
            },
          ]
        : [],

      ignore_dr: Array.isArray(p.ignore_dr)
        ? p.ignore_dr.map((dr) => (isDoctorObj(dr) ? dr._id : String(dr)))
        : [],

      doctor_id: Array.isArray(p.doctor_id)
        ? p.doctor_id.map((dr) => (isDoctorObj(dr) ? dr._id : String(dr)))
        : [],

      completed_time: p.completed_time ?? "",
      online_dr: { _id: "", email: "", id: "" },
    };
  }, []);
  const cacheUpdateAfterAdminDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      const newPatient = transformDeleteBackValue(payload);
      if (newPatient && newPatient.status === "completed") {
        dispatch(
          DoctorCompletedPatientListApi.util.updateQueryData(
            "getDoctorCompletedPatientList",
            { page, limit, search },
            (draft) => {
              const exist = draft.data.some((p) => p._id === newPatient._id);
              if (!exist) {
                draft.data.unshift(newPatient);
              }
            }
          )
        );
      }
    },
    [dispatch, transformDeleteBackValue, page, limit, search]
  );
  useEffect(() => {
    if (!messages.length) return;

    messages.forEach((msg) => {
      if (msg.type === "submit_patient") {
        refetch();
      }
      if (msg.type === "admin_mr_delete_back") {
        cacheUpdateAfterAdminDeleteBack(msg.payload);
      }
    });

    clearMessages();
  }, [messages, clearMessages, refetch, cacheUpdateAfterAdminDeleteBack]);
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
    <Panel header="Completed Report" size="lg">
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

export default CompletedPatients;
