import { useGetAdminDoctorDeletedListQuery } from "@/entities/admin/users/api/query";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { USER_DATA_COL } from "../../users-list/ui/userList.data.col";

const DeletedUserList = () => {
  usePageTitle("Deleted Doctor List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const { data: doctorlist, isLoading } = useGetAdminDoctorDeletedListQuery({
    page,
    limit,
    search,
  });
  const totalPages = doctorlist?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      doctorlist?.data
        ?.filter((item) => item.email !== "All")
        .map((item, index) => ({
          key: item._id,
          sl: (page - 1) * limit + index + 1,
          name: item.email,
          mobile: item.mobile,
          role: item.role === "ecg_dr" ? "ECG" : "Radiology",
          address: item.address,
          action: "",
        })) || [],
    [doctorlist?.data, page, limit]
  );

  const COLUMN = USER_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex">
            <Link
              to={`/admin/user/${record?.key}`}
              className="bg-blue-500 text-white px-2 py-2 text-sm"
            >
              Edit
            </Link>
            <Link
              to={`/admin/change-password/${record?.key}`}
              className="bg-yellow-500 text-white px-2 py-2 text-sm"
            >
              C.Password
            </Link>

            <Link
              to={`/admin/delete/${record?.key}`}
              className="bg-red-500 text-white px-2 py-2 text-sm"
            >
              Delete
            </Link>
          </div>
        ),
      };
    }
    return item;
  });

  return (
    <Panel header="Deleted Doctor List" size="lg">
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        page={page}
        totalPages={totalPages}
        hasNext={doctorlist?.pagination.hasNext}
        hasPrev={doctorlist?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
      />
    </Panel>
  );
};

export default DeletedUserList;
