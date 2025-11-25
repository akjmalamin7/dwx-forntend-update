import { DeleteAdminUser } from "@/features";
import { useGetUserListQuery } from "@/shared/redux/features/admin/add-user/addUserApi";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { USER_DATA_COL } from "./userList.data.col";

const AllUserList = () => {
  const role = "user";
  const {
    data: DoctorList,
    isLoading,
    refetch,
  } = useGetUserListQuery(role!, {
    skip: !role,
  });

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      DoctorList?.filter((item) => item.email !== "All").map((item, index) => ({
        key: item._id,
        sl: index + 1,
        name: item.email,
        mobile: item.mobile,
        role: item.role === "user" ? "User" : "",
        address: item.address,
        action: "",
      })) || [],
    [DoctorList]
  );

  const handleRefetch = () => {
    refetch();
  };
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
            <DeleteAdminUser id={record?.key} onDeleteSuccess={handleRefetch} />
          </div>
        ),
      };
    }
    return item;
  });
  return <div>AllUserList</div>;
};

export default AllUserList;
