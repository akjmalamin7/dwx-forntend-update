import { useAuth, usePageTitle } from "@/shared/hooks";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table"; 
import { useMemo } from "react"; 
import { SUMMERY_DATA_COL } from "./todaySummery.data.col";
import { useGetTodaySummaryQuery } from "@/shared/redux/features/admin/today-summery/todaySummeryApi";

const TodaySummery = () => {
  const { data: summeryList, isLoading } = useGetTodaySummaryQuery();
  const { user } = useAuth();
  const DATA_TABLE = useMemo(
    () =>
      summeryList?.map((item, index) => ({
        key: item._id,
        sl: index + 1, 
        agent_name:  item.email, 
        name:  item.name, 
        mobile: item.mobile,
        address: item.address, 
        totalCompleted: item.totalCompleted, 
        action: "",
      })) || [],
    [summeryList, user?.id]
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
    searchFields: ["agent_name"],
    rowsPerPage: 100,
  });

  usePageTitle("Today Summery", {
        prefix: "DWX - ",
        defaultTitle: "DWX",
        restoreOnUnmount: true,
      });
      

  return (
    <Panel header="Today Summery" size="lg">
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by DC Name..."
          />
           <label className="font-semibold">Filter By Date:</label>
            <input
              type="date"
              value="" 
              className="border px-2 py-1 rounded"
            />

        </div> 


        <Table
          loading={isLoading}
          columns={SUMMERY_DATA_COL}
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

export default TodaySummery;
