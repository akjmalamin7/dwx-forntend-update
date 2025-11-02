import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination"; 
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import { useMemo } from "react"; 
import {  useGetDeletedUserListQuery } from "@/shared/redux/features/admin/add-user/addUserApi";
import type { DataSource } from "@/shared/ui/table/table.model";
import { Link } from "react-router-dom";
import { USER_DATA_COL } from "../../users/ui/userList.data.col";

const DeletedUserList = () => { 
  const { data: DoctorList, isLoading } = useGetDeletedUserListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      DoctorList?.map((item, index) => ({
        key: item._id,
        sl: index + 1,
        name: item.email,
        mobile: item.mobile,
        role: item.role === "user"?"User":"",
        address: item.address,
        action: "",
      })) || [],
    [DoctorList]
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
    <Panel header="Deleted User List" size="lg">
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

export default DeletedUserList;
