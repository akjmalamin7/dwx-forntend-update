import { PatientDeleteBack } from "@/features";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useGetDeletedPatientListQuery } from "@/shared/redux/features/admin/deleted-patient/deletedPatientListApi";
import { Panel, ServerSidePagination } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { PATIENT_DATA_COL } from "./patient.data.col";

const PatientDeleted = () => {

  const { page, limit, setPage } = usePageQuery({ defaultPage: 1, defaultLimit: 10 });
  const {
    data: patientList,
    isLoading,
    refetch,
  } = useGetDeletedPatientListQuery({ page, limit });

  const totalPages = patientList?.pagination?.totalPages || 1;

  useServerSidePagination({
    totalPages, initialPage: page, onPageChange: setPage,
  });


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
          <div key={rowIndex}>
            <PatientDeleteBack path={record?.key} onDeleteSuccess={refetch} />
          </div>
        ),
      };
    }
    return item;
  });

  return (
    <Panel header="Deleted Report" size="lg">
      <div className="p-4 bg-white">
        <Table loading={isLoading} columns={COLUMN} dataSource={DATA_TABLE} />
        <ServerSidePagination
          currentPage={page}
          totalPages={totalPages}
          hasNext={patientList?.pagination.hasNext}
          hasPrev={patientList?.pagination.hasPrev}
          onPageChange={setPage}
        />
      </div>
    </Panel>
  );
};

export default PatientDeleted;
