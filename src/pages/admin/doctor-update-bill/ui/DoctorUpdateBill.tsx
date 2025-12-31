import { useGetAdminDoctorUdateBillListQuery } from "@/entities/admin/doctors/api/query";
import { DoctorUpdateBillAction } from "@/features";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const DoctorUpdateBill = () => {
  const { doctorId, month } = useParams<{
    doctorId: string;
    month: string;
  }>();
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 100,
  });

  const { data: doctorList, isLoading } = useGetAdminDoctorUdateBillListQuery({
    page,
    limit,
    doctorId,
    month,
    search,
  });
  // const { data: doctorList, isLoading } = useGetAdminDoctorUdateBillListQuery(
  //   doctorId && month ? { page, limit, doctorId, month, search } : skipToken
  // );

  const totalPages = doctorList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  usePageTitle("Update Doctor Bill", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
  const DATA_TABLE = useMemo(
    () =>
      doctorList?.data?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        email: item.username,
        xray_name: item.xray_name,
        image_type: item.image_type,
        month: item.month,
        action: "",
      })) || [],
    [doctorList?.data, page, limit]
  );

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => {
          const originalItem = doctorList?.data.find(
            (item) => item._id === record?.key
          );

          return (
            <div key={rowIndex}>
              <DoctorUpdateBillAction
                defaultValue={(record?.image_type ?? "") as string}
                name="image_type"
                id={originalItem?._id}
              />
            </div>
          );
        },
      };
    }
    return item;
  });

  return (
    <Panel header="Update Doctor Bill" size="lg">
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        page={page}
        totalPages={totalPages}
        hasNext={doctorList?.pagination.hasNext}
        hasPrev={doctorList?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
      />
    </Panel>
  );
};

export default DoctorUpdateBill;
