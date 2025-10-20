import { useAuth } from "@/shared/hooks";
import { Navigate, Outlet } from "react-router-dom";

interface RoleProtectedProps {
  allowedRoles: string[];
}

const PrivateRoutes = ({ allowedRoles }: RoleProtectedProps) => {
  const { isAuthenticate, user } = useAuth();

  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.role || !allowedRoles.includes(user.role)) {
    console.log(`User role "${user?.role}" not in allowed roles:`, allowedRoles);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;