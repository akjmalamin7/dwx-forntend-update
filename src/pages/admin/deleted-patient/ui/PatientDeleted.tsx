import { PatientDeleteBack } from "@/features";
import { PermanentDeleteAdminPatient } from "@/features/admin/permanent-delete-admin-patient";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { useAppDispatch } from "@/shared/hooks/use-dispatch/useAppDispatch";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import type { WSMessage } from "@/shared/hooks/use-web-socket/model/schema";
import { useWebSocket } from "@/shared/hooks/use-web-socket/model/useWebSocket";
import {
  AdminDeletedPatientListApi,
  useGetDeletedPatientListQuery,
} from "@/shared/redux/features/admin/deleted-patient/deletedPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const PatientDeleted = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });

  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetDeletedPatientListQuery({ page, limit, search });

  const totalPages = patientList?.pagination?.totalPages || 1;

  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  const wsUrl = import.meta.env.VITE_WS_URL;
  const { sendMessage } = useWebSocket<WSMessage>(wsUrl, 500);

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
        createdAt: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "—",
        agent_name: item.agent_id?.email,
        patient_name: item.name,
        patient_id: item.patient_id,
        gender: item.gender,
        age: item.age,
        rtype: item.rtype,
        completed_dr: item?.completed_dr?.email,
        xray_name: item.xray_name,
        action: "",
      })) || [],
    [patientList, page, limit]
  );

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex">
            <PatientDeleteBack
              patient={patientList?.data.find((p) => p._id === record?.key)}
              path={record?.key}
              sendMessage={sendMessage}
              onDeleteSuccess={() => {
                dispatch(
                  AdminDeletedPatientListApi.util.updateQueryData(
                    "getDeletedPatientList",
                    { page, limit, search },
                    (draft) => {
                      draft.data = draft.data.filter(
                        (p) => p._id !== record?.key
                      );
                    }
                  )
                );
              }}
            />
            <PermanentDeleteAdminPatient
              path={record?.key}
              onDeleteSuccess={refetch}
            />
            <Link
              to={`/admin/patient-view/${record?.key}`}
              className="bg-green-500 text-white px-2 py-2 text-sm"
            >
              View
            </Link>
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Deleted Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel header="Deleted Report" size="lg">
      <DataTable
        size="lg"
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

export default PatientDeleted;
