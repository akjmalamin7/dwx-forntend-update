import { useGetAdminUserListQuery } from "@/entities/admin/users/api/query";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination/useServerSidePagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { XRAY_DOCTOR_LIST } from "./userList.data.col";

const XrayDoctorList = () => {
  const { page, limit, setPage } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const { data: doctorList, isLoading, isError } = useGetAdminUserListQuery({
    page,
    limit,
    role: "xray_dr",
  });
  const totalPages = doctorList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      doctorList?.data
        ?.filter((item) => item.email !== "All")
        .map((item, index) => ({
          key: item._id,
          sl: (page - 1) * limit + index + 1,
          name: item.email,
          mobile: item.mobile,
          role: item.role === "xray_dr" ? "Radiology" : "",
          signature: item.image && (
            <div className="flex items-center justify-center">
              <img className="h-[50px]" src={item.image[0]} />
            </div>
          ),
          address: item.address,
          action: "",
        })) || [],
    [doctorList?.data, page, limit]
  );

  const COLUMN = XRAY_DOCTOR_LIST.map((item) => {
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


  // Map data properly
  // const DATA_TABLE = useMemo<DataSource[]>(() => {
  //   if (!doctorList?.data) return [];

  //   return doctorList.data.map((item, index) => ({
  //     key: item._id,
  //     sl: (page - 1) * limit + index + 1,
  //     name: item.email,
  //     mobile: item.mobile,
  //     role: "Radiology",
  //     signature: item.image,
  //     address: item.address,
  //     action: item._id,
  //   }));
  // }, [doctorList?.data, page, limit]);

  // Add render functions ONLY here
  // const COLUMN = XRAY_DOCTOR_LIST.map((col) => {
  //   if (col.key === "signature") {
  //     return {
  //       ...col,
  //       render: (_, record) => <UserSignature image={record.signature} />,
  //     };
  //   }

  //   if (col.key === "action") {
  //     return {
  //       ...col,
  //       render: (_, record) => <UserActions id={record.key} />,
  //     };
  //   }

  //   return col;
  // });

  usePageTitle("Radiology Doctor List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
  if (isError)
    return (
      <Panel size="lg" header="Radiology Doctor List">
        <p className="text-red-500">Failed to load doctors.</p>
      </Panel>
    );

  if (!isLoading && DATA_TABLE.length === 0)
    return (
      <Panel size="lg" header="Radiology Doctor List">
        <p className="text-gray-500">No Doctors Found</p>
      </Panel>
    );

  return (
    <Panel header="Radiology Doctor List" size="lg">
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        page={page}
        totalPages={totalPages}
        hasNext={doctorList?.pagination.hasNext}
        hasPrev={doctorList?.pagination.hasPrev}
        setPage={setPage}
      />
    </Panel>
  );
};

export default XrayDoctorList;
