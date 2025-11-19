import DeleteAdminFormat from "@/features/delete-format/DeleteAdminFormat";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, PanelHeading, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { REFERENCE_DOCTOR_DATA_COL } from "./format.data.col";
import { useGetFormatListQuery } from "@/shared/redux/features/admin/format/formatApi";
import { usePageTitle } from "@/shared/hooks";


const FormatList = () => {
  const { data: FormatList, isLoading, refetch } = useGetFormatListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      FormatList?.map((item, index) => ({
        key: item.id,
        sl: index + 1,
        title: item.title,
        action: "",
      })) || [],
    [FormatList]
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
    searchFields: ["title"],
    rowsPerPage: 100,
  });

  const COLUMN = REFERENCE_DOCTOR_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex gap-2">
            <Link
              to={`/admin/format/${record?.key}`}
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
      <div className="w-1/3">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by Title"
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

export default FormatList;
