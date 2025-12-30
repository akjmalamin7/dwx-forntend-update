import { CompletedBack, DeleteAdminPatient } from "@/features";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useGetAdminCompletedPatientListQuery } from "@/shared/redux/features/admin/completed-patients/completedPatientsApi";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const CompletedPatients = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetAdminCompletedPatientListQuery({ page, limit, search });
  const totalPages = patientList?.pagination.totalPages || 1;

  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

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
        status: item.status,

        completed_dr: item.completed_dr?.email,
        xray_name: item.xray_name,
        action: "",
      })) || [],
    [patientList?.data, limit, page]
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

            <CompletedBack
              // sendMessage={sendMessage}
              path={record?.key}
              patient={patientList?.data.find((p) => p._id === record?.key)}
              // onDeleteSuccess={}
            />

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
