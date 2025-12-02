import { useGetAllXrayNameQuery } from "@/entities/admin/all-xray-name/api/query";
import { DeleteXraytype } from "@/features/delete-xraytype";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel, PanelHeading } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { XRAYTYPE_DATA_COL } from "./xraytype.data.col";

const AllXrayName = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const {
    data: xrayNameList,
    isLoading,
    refetch,
  } = useGetAllXrayNameQuery({ page, limit, search });
  const totalPages = xrayNameList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      xrayNameList?.data?.map((item, index) => ({
        key: item.id,
        sl: (page - 1) * limit + index + 1,
        name: item.name,
        action: "",
      })) || [],
    [xrayNameList?.data, limit, page]
  );

  const COLUMN = XRAYTYPE_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource) => (
          <div className="flex gap-2">
            <DeleteXraytype id={record?.key} onDeleteSuccess={refetch} />
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Xraytype List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel
      header={
        <PanelHeading
          title="Xraytype List"
          button="Xraytype Add"
          path="/admin/xraytype-add"
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
        hasNext={xrayNameList?.pagination.hasNext}
        hasPrev={xrayNameList?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
        size="sm"
      />
    </Panel>
  );
};

export default AllXrayName;
