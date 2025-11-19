import { DeleteAdminPatient, TypingBack } from "@/features";
import { useAuth } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useGetPendingPatientListQuery } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const PatientPending = () => {
  const { page, limit, setPage } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 5,
  });

  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetPendingPatientListQuery({ page, limit });

  const totalPages = patientList?.pagination.totalPages || 1;

  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  const { user } = useAuth();

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
    <Panel header="Deleted Report" size="lg">
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        page={page}
        totalPages={totalPages}
        hasNext={patientList?.pagination.hasNext}
        hasPrev={patientList?.pagination.hasPrev}
        setPage={setPage}
      />
    </Panel>
  );
};

export default PatientPending;
