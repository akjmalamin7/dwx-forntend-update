import { DeleteXraytype } from "@/features/delete-xraytype";
import { usePageTitle } from "@/shared/hooks";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { useGetXraytypeListQuery } from "@/shared/redux/features/admin/xraytype-list/xraytypeListApi";
import { Pagination, Panel, PanelHeading, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { XRAYTYPE_DATA_COL } from "./xraytype.data.col";

const XraytypeList = () => {
  const { data: XraytypeList, isLoading, refetch } = useGetXraytypeListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      XraytypeList?.map((item, index) => ({
        key: item.id,
        sl: index + 1,
        name: item.name,
        action: "",
      })) || [],
    [XraytypeList]
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

export default XraytypeList;
