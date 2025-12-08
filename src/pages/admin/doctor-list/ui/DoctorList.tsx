import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { useGetUpdateDoctorListQuery } from "@/shared/redux/features/admin/doctor-list/doctorListApi";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DOCTOR_DATA_COL } from "./updateDoctor.data.col";

const DoctorList = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const { data: doctorList, isLoading } = useGetUpdateDoctorListQuery({
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
      doctorList?.data.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        email: item.email,
        role: item.role == "xray_dr" ? "Radiology Doctor" : "Ecg Doctor",
        action: "",
      })) || [],
    [doctorList?.data, limit, page]
  );

  const COLUMN = DOCTOR_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}>
            <Link
              to={`/admin/doctor-bill-month/${record?.key}`}
              className="bg-yellow-500 text-white px-4 py-2 text-sm rounded"
            >
              View
            </Link>
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Update Doctor Bill", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel header="Doctor List" size="lg">
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

export default DoctorList;
