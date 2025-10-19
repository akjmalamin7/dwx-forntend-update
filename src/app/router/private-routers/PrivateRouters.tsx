import { useAuth } from "@/shared/hooks";
import { Navigate, Outlet } from "react-router-dom";
interface RoleProtectedProps {
  allowedRoles: string[]
}

const PrivateRoutes = ({ allowedRoles }: RoleProtectedProps) => {
  const { isAuthenticate, user } = useAuth();
  if (!isAuthenticate) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user?.role || "user")) {
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />
  // return isAuthenticate === true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
