import { UserActions, UserSignature } from "@/entities/admin/users";
import { useGetAdminUserListQuery } from "@/entities/admin/users/api/query";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Message, Panel } from "@/shared/ui";
import type { Columns, DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { ECG_DOCTOR_LIST } from "./userList.data.col";

const ECGDoctorList = () => {
  usePageTitle("ECG Doctor List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
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
    role: "ecg_dr",
    search,
  });
  const totalPages = doctorList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      doctorList?.data
        ?.filter((item) => item.email !== "All")
        .map((item, index) => ({
          key: item._id,
          sl: (page - 1) * limit + index + 1,
          name: item.email,
          mobile: item.mobile,
          role: item.role === "ecg_dr" ? "ECG" : "",
          signature: item.image,
          address: item.address,
          action: item._id,
        })) || [],
    [doctorList?.data, page, limit]
  );

  const COLUMN: Columns<DataSource>[] = ECG_DOCTOR_LIST.map((col) => {
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
  if (isError) {
    return <Message type="error" message="Failed to load doctors." />;
  }

  if (!isLoading && DATA_TABLE.length === 0) {
    return <Message type="normal" message="No Doctors Found" />;
  }
  return (
    <Panel header="ECG Doctor List" size="lg">
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

export default ECGDoctorList;
