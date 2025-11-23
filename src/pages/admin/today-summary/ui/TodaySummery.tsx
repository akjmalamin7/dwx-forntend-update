import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useGetAdminTodaySummaryQuery } from "@/shared/redux/features/admin/today-summery/todaySummeryApi";
import { Panel } from "@/shared/ui";
import { DataTable } from "@/widgets";
import { useMemo, useState, type ChangeEvent } from "react";
import { SUMMERY_DATA_COL } from "./todaySummery.data.col";
const formDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};
const TodaySummery = () => {
  const [date, setDate] = useState(formDate(new Date()));
  const { page, limit, setPage } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const { data: summeryList, isLoading } = useGetAdminTodaySummaryQuery({
    page,
    limit,
    date,
  });
  const totalPages = summeryList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  const handleDateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  // const { user } = useAuth();
  const DATA_TABLE = useMemo(
    () =>
      summeryList?.data?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        agent_name: item.email,
        name: item.name,
        mobile: item.mobile,
        address: item.address,
        totalCompleted: item.totalCompleted,
        action: "",
      })) || [],
    [summeryList?.data, limit, page]
  );

  usePageTitle("Today Summery", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel header="Today summary" size="lg">
      <div>
        <label className="font-semibold">Filter By Date:</label>
        <input
          type="date"
          value={date}
          onChange={handleDateFilter}
          className="border px-2 py-1 rounded"
        />
      </div>
      <DataTable
        isLoading={isLoading}
        column={SUMMERY_DATA_COL}
        dataSource={DATA_TABLE}
        page={page}
        totalPages={totalPages}
        hasNext={summeryList?.pagination.hasNext}
        hasPrev={summeryList?.pagination.hasPrev}
        setPage={setPage}
      />
    </Panel>
  );
};

export default TodaySummery;
