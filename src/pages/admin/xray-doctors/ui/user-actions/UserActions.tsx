import { Link } from "react-router-dom";

const UserActions = ({ id }: { id: string }) => {
  return (
    <div className="flex gap-2">
      <Link
        to={`/admin/user/${id}`}
        className="bg-blue-500 text-white px-2 py-1 text-sm rounded"
      >
        Edit
      </Link>

      <Link
        to={`/admin/change-password/${id}`}
        className="bg-yellow-500 text-white px-2 py-1 text-sm rounded"
      >
        C.Password
      </Link>

      <Link
        to={`/admin/delete/${id}`}
        className="bg-red-500 text-white px-2 py-1 text-sm rounded"
      >
        Delete
      </Link>
    </div>
  );
};

export default UserActions;
