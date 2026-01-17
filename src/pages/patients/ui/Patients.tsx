import { useAuth, usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useAgentPendingSocket } from "@/shared/hooks/use-socket/useAgentPendingSocket";
import { useGetPendingPatientListQuery } from "@/shared/redux/features/agent/pending-patient-list/pendingPatientListApi";
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

const Patients = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 100,
  });
  const {
    data: patientList,
    // refetch,
    isLoading,
  } = useGetPendingPatientListQuery(
    {
      page,
      limit,
      search,
    },
    { pollingInterval: 5 * 60 * 1000, refetchOnMountOrArgChange: true }
  );
  const totalPages = patientList?.pagination.totalPages || 1;
  const { user } = useAuth();
  // Prepare data
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  // <svg id="4944fe" viewBox="0 0 19 19" stroke="currentColor" fill="none"><path stroke-linecap="round" stroke-width="1.875" d="M9.5 2.938v2.625m0 7.875v2.624M2.938 9.5h2.625m7.875 0h2.624M4.86 4.86l1.856 1.856m5.569 5.568 1.856 1.856m-9.28 0 1.855-1.856m5.569-5.568L14.14 4.86"></path></svg>
  const { mergedPatientData, onlineDoctorsMap, resetRealtime } =
    useAgentPendingSocket({
      wsUrl: import.meta.env.VITE_WS_URL,
      page,
      apiPatients: patientList?.data,
    });

  useEffect(() => {
    resetRealtime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);
  const DATA_TABLE = useMemo(
    () =>
      mergedPatientData?.map((item, index) => {
        const liveDoctor = onlineDoctorsMap[item._id];
        return {
          key: item._id,
          sl: (page - 1) * limit + index + 1,
          start_time: new Date(item.createdAt).toLocaleString(),
          patient_age: item.age,
          patient_name: item.name,
          patient_id: item.patient_id,
          patient_sex: item.gender,
          xray_name: item.xray_name,
          type: item.rtype,
          // selected_dr:
          //   Array.isArray(item.doctor_id) && item.doctor_id.length > 0
          //     ? item.doctor_id.map((d) => d.email).join(", ")
          //     : "All",
          selected_dr: user?.id ? formatEmails(item.doctor_id) || "All" : "All",
          ignore_dr: formatEmails(item.ignore_dr) || "N/A",
          // ignore_dr:
          //   Array.isArray(item.ignore_dr) && item.ignore_dr.length > 0
          //     ? item.ignore_dr.map((d) => d.email).join(", ")
          //     : "",
          // online_dr: item.online_dr?.email || "",
          online_dr: liveDoctor
            ? liveDoctor.email
            : item.online_dr?.email || "",
          action: "",
        };
      }) || [],
    [mergedPatientData, limit, page, onlineDoctorsMap, user]
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
            <Link
              to={`/agent/patient-view/${record?.key}`}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              View
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
