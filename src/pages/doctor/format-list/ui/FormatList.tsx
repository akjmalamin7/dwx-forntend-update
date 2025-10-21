import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
 import { Pagination, Panel, PanelHeading, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import { useMemo } from "react";
import { REFERENCE_DOCTOR_DATA_COL } from "./format.data.col"; 
import { Link } from "react-router-dom";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useGetFormatListQuery } from "@/shared/redux/features/doctor/format-list/formatListApi";

const FormatList = () => {
  const { data: FormatList, isLoading } = useGetFormatListQuery();

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


  console.log(FormatList);
    const COLUMN = REFERENCE_DOCTOR_DATA_COL.map((item) => {
      if (item.key === "action") {
        return {
          ...item,
          render: (_: unknown, record?: DataSource, rowIndex?: number) => (
            <div key={rowIndex}>
              <Link
                to={`/doctor/format/${record?.key}`}
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
              >
                Edit
              </Link>
              <Link
                to={`/doctor/format/${record?.key}`}
                className="bg-yellow-500 ml-2 text-white px-2 py-1 rounded text-sm"
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
    <Panel
    header={
          <PanelHeading
            title="Format List List"
            button="Format Add"
            path="/doctor/format-add"
          />
        } 
        size="md">
      <div className="w-1/3">
      <Search
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by Title"
      />
      </div>

      <Table
        loading={isLoading}
        columns={COLUMN}
        dataSource={paginatedData}
      />

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
