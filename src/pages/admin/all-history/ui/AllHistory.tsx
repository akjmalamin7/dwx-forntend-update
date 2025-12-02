import { useGetAdminHistoryListQuery } from "@/entities/admin/all-history/api/query";
import { DeleteHistory } from "@/features/history-delete";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel, PanelHeading } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { HISTORY_DATA_COL } from "./history.data.col";

const AllHistory = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const {
    data: historyList,
    isLoading,
    refetch,
  } = useGetAdminHistoryListQuery({ page, limit, search });
  const totalPages = historyList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      historyList?.data?.map((item, index) => ({
        key: item.id,
        sl: (page - 1) * limit + index + 1,
        name: item.name,
        action: "",
      })) || [],
    [historyList?.data, page, limit]
  );

  const COLUMN = HISTORY_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource) => (
          <div className="flex gap-2">
            <DeleteHistory id={record?.key} onDeleteSuccess={refetch} />
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("History List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel
      header={
        <PanelHeading
          title="History List"
          button="History Add"
          path="/admin/history-add"
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
        hasNext={historyList?.pagination.hasNext}
        hasPrev={historyList?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
        size="sm"
      />
    </Panel>
  );
};

export default AllHistory;
