import { useAuth } from "@/shared/hooks";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table"; 
import { useMemo } from "react"; 
import { MONTH_DATA_COL } from "./monthList.data.col"; 
import { useGetMonthlyCompletedQuery } from "@/shared/redux/features/admin/monthly-completed/monthlyCompletedApi";
import { Link } from "react-router-dom";
import type { DataSource } from "@/shared/ui/table/table.model";

const MonthList = () => {
  const { data: monthList, isLoading } = useGetMonthlyCompletedQuery();
  const { user } = useAuth();
  const DATA_TABLE = useMemo(
    () =>
      monthList?.map((item, index) => ({
        key: item._id,
        sl: index + 1, 
        count:  item.count,  
        action: "",
      })) || [],
    [monthList, user?.id]
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
    searchFields: ["key"],
    rowsPerPage: 100,
  });

 
  
    const COLUMN = MONTH_DATA_COL.map((item) => {
      if (item.key === "action") {
        return {
          ...item,
          render: (_: unknown, record?: DataSource, rowIndex?: number) => (
            <div key={rowIndex}>
               <Link
                to={`/admin/patient-view/${record?.key}`}
                className="bg-green-500 text-white px-2 py-2 rounded text-sm"
              >
                View
              </Link>
           
            </div>
          ),
        };
      }
      return item;
    });


  return (
    <Panel header="Monthly Report Manage" size="lg">
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Month..."
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
      </div>
    </Panel>
  );
};

export default MonthList;
