import { useGetAdminDoctorBillingListQuery } from "@/entities/admin/bill/api/query";
import { CustomerUpdateBillAction } from "@/features";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const CustomerUpdateBill = () => {
  const { page, limit, search, setPage, setSearch, setLimit, userId, month } =
    usePageQuery({
      defaultPage: 1,
      defaultLimit: 100,
    });
  const { data: doctorList, isLoading } = useGetAdminDoctorBillingListQuery({
    userId,
    month,
    page,
    limit,
    search,
  });
  const totalPages = doctorList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  const DATA_TABLE = useMemo(
    () =>
      doctorList?.data?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        username: item.agent_id.email,
        xray_name: item.xray_name,
        image_type: item.image_type,
        month: item.month_year,
        view: "",
        action: "",
      })) || [],
    [doctorList?.data, page, limit]
  );

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "view") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}>
            <Link
              to={`/admin/patient-view/${record?.key}`}
              className="bg-yellow-500 text-white px-2 py-2 text-sm"
            >
              View
            </Link>
          </div>
        ),
      };
    }

    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => {
          const originalItem = doctorList?.data?.find(
            (item) => item._id === record?.key
          );
          return (
            <div key={rowIndex}>
              <CustomerUpdateBillAction
                defaultValue={(record?.image_type ?? "") as string}
                name="image_type"
                id={originalItem?._id}
              />
            </div>
          );
        },
      };
    }
    return item;
  });

  usePageTitle("Update Customer Bill", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel header="Update Customer Bill" size="lg">
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        page={page}
        totalPages={totalPages}
        hasNext={doctorList?.pagination.hasNext}
        hasPrev={doctorList?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
      />
    </Panel>
  );
};

export default CustomerUpdateBill;
