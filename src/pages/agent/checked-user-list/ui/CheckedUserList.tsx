import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
 import { Pagination, Panel, PanelHeading, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import { useMemo } from "react";
import { CHECKED_USER_DATA_COL } from "./checkedUser.data.col";
import { Link } from "react-router-dom";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useGetCheckedUserListQuery } from "@/shared/redux/features/agent/checked-user-list/checkedUserListApi";

const CheckedUserList = () => {
  const { data: ReferenceList, isLoading } = useGetCheckedUserListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      ReferenceList?.map((item, index) => ({
        key: item._id,
        sl: index + 1,
        name: item.name,  
        details: item.details, 
        action: "",
      })) || [],
    [ReferenceList]
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
    searchFields: ["name","details"],
    rowsPerPage: 100,
  });


  
    const COLUMN = CHECKED_USER_DATA_COL.map((item) => {
      if (item.key === "action") {
        return {
          ...item,
          render: (_: unknown, record?: DataSource, rowIndex?: number) => (
            <div key={rowIndex}>
              <Link
                to={`/agent/reference-list/${record?.key}`}
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
              >
                Edit
              </Link>
              <Link
                to={`/agent/reference-list/${record?.key}`}
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
          title="Checked User List"
          button="Checked User Add"
          path="/agent/checked-user-add"
        />
      } 
      size="md">
      <div className="w-1/3">
      <Search
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by Name"
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

export default CheckedUserList;
