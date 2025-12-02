import { useGetAdminFormatesQuery } from "@/entities/formates/api/query";
import DeleteAdminFormat from "@/features/delete-format/DeleteAdminFormat";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel, PanelHeading } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { REFERENCE_DOCTOR_DATA_COL } from "./format.data.col";

const AllFormates = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const {
    data: allFormates,
    isLoading,
    refetch,
  } = useGetAdminFormatesQuery({ page, limit, search });

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      allFormates?.data?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        title: item.title,
        action: "",
      })) || [],
    [allFormates?.data, page, limit]
  );
  const totalPages = allFormates?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });

  const COLUMN = REFERENCE_DOCTOR_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex gap-2">
            <Link
              to={`/admin/format/${record?.key}`}
              data-set={record?.key}
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              Edit
            </Link>
            <DeleteAdminFormat id={record?.key} onDeleteSuccess={refetch} />
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Format List List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel
      header={
        <PanelHeading
          title="Format List List"
          button="Format Add"
          path="/admin/format-add"
        />
      }
      size="md"
    >
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        page={page}
        totalPages={totalPages}
        hasNext={allFormates?.pagination.hasNext}
        hasPrev={allFormates?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
        size="sm"
      />
    </Panel>
  );
};

export default AllFormates;
