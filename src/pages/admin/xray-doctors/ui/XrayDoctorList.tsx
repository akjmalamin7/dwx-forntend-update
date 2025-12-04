import { UserActions, UserSignature } from "@/entities/admin/users";
import { useGetAdminUserListQuery } from "@/entities/admin/users/api/query";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Message, Panel } from "@/shared/ui";
import type { Columns, DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { XRAY_DOCTOR_LIST } from "./userList.data.col";

const XrayDoctorList = () => {
  const { page, limit, setPage } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const {
    data: doctorList,
    isLoading,
    isError,
  } = useGetAdminUserListQuery({
    page,
    limit,
    role: "xray_dr",
  });
  const totalPages = doctorList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  // Map data properly
  const DATA_TABLE = useMemo<DataSource[]>(() => {
    if (!doctorList?.data) return [];
    console.log(doctorList.data);
    return doctorList.data.map((item, index) => ({
      key: item._id,
      sl: (page - 1) * limit + index + 1,
      name: item.email,
      mobile: item.mobile,
      role: "Radiology",
      signature: item.image,
      address: item.address,
      action: item._id,
    }));
  }, [doctorList?.data, page, limit]);

  const COLUMN: Columns<DataSource>[] = XRAY_DOCTOR_LIST.map((col) => {
    if (col.key === "signature") {
      return {
        ...col,
        render: (_: unknown, record?: DataSource) => {
          return (
            <UserSignature image={(record?.signature as string[]) ?? []} />
          );
        },
      };
    }

    if (col.key === "action") {
      return {
        ...col,
        render: (_: unknown, record?: DataSource) => (
          <UserActions id={record?.key ?? ""} />
        ),
      };
    }

    return col;
  });

  usePageTitle("Radiology Doctor List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  if (isError) {
    return <Message type="error" message="Failed to load doctors." />;
  }

  if (!isLoading && DATA_TABLE.length === 0) {
    return <Message type="normal" message="No Doctors Found" />;
  }

  return (
    <Panel header="Radiology Doctor List" size="lg">
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        page={page}
        totalPages={totalPages}
        hasNext={doctorList?.pagination.hasNext}
        hasPrev={doctorList?.pagination.hasPrev}
        setPage={setPage}
      />
    </Panel>
  );
};

export default XrayDoctorList;
