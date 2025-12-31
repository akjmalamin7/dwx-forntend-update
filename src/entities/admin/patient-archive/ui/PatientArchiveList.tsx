import { CompletedBack, DeleteAdminPatient } from "@/features";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetAdminArchivePatientListQuery } from "../api/query";
import { PATIENT_DATA_COL } from "./patient.data.col";

const PatientArchiveList = () => {
  const { month } = useParams<{ month: string }>();
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetAdminArchivePatientListQuery({ page, limit, month, search });
  const totalPages = patientList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  // const wsUrl = import.meta.env.VITE_WS_URL;
  // const { sendMessage } = useWebSocket<WSMessage>(wsUrl, 500);

  const DATA_TABLE = useMemo(
    () =>
      patientList?.data?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        start_time: new Date(item.completed_time).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        agent_name: item.agent_id?.email,
        patient_name: item.name,
        patient_id: item.patient_id,
        age: item.age,
        rtype: item.rtype,

        completed_dr: item.completed_dr[0]?.email,
        xray_name: item.xray_name,
        action: "",
      })) || [],
    [patientList?.data, page, limit]
  );

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex justify-end">
            <Link
              to={`/admin/patient-view/${record?.key}`}
              className="bg-green-500 text-white px-2 py-2 text-sm"
            >
              View
            </Link>

            <CompletedBack
              path={record?.key}
              onDeleteSuccess={refetch}
              // sendMessage={sendMessage}
            />
            <DeleteAdminPatient id={record?.key} onDeleteSuccess={refetch} />
          </div>
        ),
      };
    }
    return item;
  });
  return (
    <Panel header="Archive patients" size="lg">
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

export default PatientArchiveList;
