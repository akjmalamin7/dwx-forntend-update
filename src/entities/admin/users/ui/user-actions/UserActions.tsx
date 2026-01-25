import { DeleteAdminUser } from "@/features";
import { Link } from "react-router-dom";

const UserActions = ({ id }: { id: string }) => {
  return (
    <div className="flex">
      <Link
        to={`/admin/user/${id}`}
        className="bg-blue-500 text-white px-2 py-2 text-sm"
      >
        Edit
      </Link> 

      <Link
        to={`/admin/change-password/${id}`}
        className="bg-yellow-500 text-white px-2 py-2 text-sm"
      >
        C.Password
      </Link>
      <DeleteAdminUser id={id} />
      
    </div>
  );
};

export default UserActions;
