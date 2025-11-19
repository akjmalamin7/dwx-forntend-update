import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, PanelHeading, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { HISTORY_DATA_COL } from "./history.data.col";  
import { useGetHistoryListQuery } from "@/shared/redux/features/admin/history-list/xraytypeListApi";
import { DeleteHistory } from "@/features/history-delete";
import { usePageTitle } from "@/shared/hooks";

const HistoryList = () => {
  const {
    data: HistoryList,
    isLoading,
    refetch,
  } = useGetHistoryListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      HistoryList?.map((item, index) => ({
        key: item.id,
        sl: index + 1,
        name: item.name,
        action: "",
      })) || [],
    [HistoryList]
  );

  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
  } = useSearchPagination({
    data: DATA_TABLE,
    searchFields: ["name"],
    rowsPerPage: 100,
  });

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
      <div className="w-1/3">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by Name"
        />
      </div>

      <Table loading={isLoading} columns={COLUMN} dataSource={paginatedData} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </Panel>
  );
};

export default HistoryList;
