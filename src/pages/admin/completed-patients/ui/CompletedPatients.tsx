import { CompletedBack, DeleteAdminPatient } from "@/features";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useAdminCompletedSocket } from "@/shared/hooks/use-socket/useAdminCompletedSocket";
import { useGetAdminCompletedPatientListQuery } from "@/shared/redux/features/admin/completed-patients/completedPatientsApi";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const CompletedPatients = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 100,
  });
  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetAdminCompletedPatientListQuery(
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
  const { mergedPatientData, resetRealTime } = useAdminCompletedSocket({
    wsUrl,
    page,
    apiPatients: patientList?.data,
  });
  useEffect(() => {
    resetRealTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

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
        agent_name: item.agent_id?.email,
        patient_name: item.name,
        patient_id: item.patient_id,
        age: item.age,
        rtype: item.rtype,
        status: item.printstatus || "Waiting",

        completed_dr: item.completed_dr?.email,
        xray_name: item.xray_name,
        action: "",
      })) || [],
    [mergedPatientData, limit, page]
  );

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex justify-end">
            <Link
              to={`/admin/completed-patient-view/${record?.key}`}
              className="bg-green-500 text-white px-2 py-2 text-sm"
            >
              View
            </Link>

            <CompletedBack path={record?.key} onDeleteSuccess={refetch} />

            <DeleteAdminPatient id={record?.key} onDeleteSuccess={refetch} />
          </div>
        ),
      };
    }
    return item;
  });

  return (
    <Panel header="Completed patients" size="lg">
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
