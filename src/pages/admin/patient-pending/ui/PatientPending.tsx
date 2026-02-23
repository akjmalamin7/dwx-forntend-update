import { DeleteAdminPatient, TypingBack } from "@/features";
import { useAuth } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useAdminPendingPatientSocket } from "@/shared/hooks/use-socket/useAdminPendingSocket";
import { useGetPendingPatientListQuery } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { formatEmails } from "@/shared/utils/dr-email-format/drEmailFormat";
import { DataTable } from "@/widgets";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

// interface Doctor {
//   _id: string;
//   email: string;
//   id?: string;
// }

const PatientPending = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 100,
  });

  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetPendingPatientListQuery(
    {
      page,
      limit,
      search,
    },
    { pollingInterval: 5 * 60 * 1000, refetchOnMountOrArgChange: true }
  );

  const totalPages = patientList?.pagination.totalPages || 1;

  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  const wsUrl = import.meta.env.VITE_WS_URL;

  const { mergedPatients, onlineDoctorsMap, resetRealtime } =
    useAdminPendingPatientSocket({
      wsUrl,
      page,
      apiPatients: patientList?.data,
      refetch,
    });

  const { user } = useAuth();

  useEffect(() => {
    resetRealtime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const DATA_TABLE = useMemo(() => {
    return mergedPatients.map((item, index) => {
      const liveDoctor = onlineDoctorsMap[item._id];
      const doctorEmail = liveDoctor?.email || item.online_dr?.email || "";

      return {
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        start_time: new Date(item.createdAt).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        agent_name: item.agent_id?.email || "N/A",
        patient_name: item.name || "Unknown",
        patient_id: item.patient_id || "N/A",
        gender: item.gender || "N/A" + (item.age ? ` (${item.age})` : ""),
        age: item.age || "N/A",
        rtype: item.rtype || "N/A",

        selected_dr: user?.id ? formatEmails(item.doctor_id) || "All" : "All",
        ignored_dr: formatEmails(item.ignore_dr) || "N/A",

        online_dr: doctorEmail,
        xray_name: item.xray_name || "N/A",
        action: "",
      };
    });
  }, [mergedPatients, onlineDoctorsMap, page, limit, user?.id]);

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex flex-wrap gap-y-4 pending-action-btns">
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
    <Panel header={`Pending Patients, Total = ${patientList?.totalPatient ?? 0}`} size="xl">
      <DataTable
        size="xl"
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
