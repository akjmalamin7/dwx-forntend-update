import { useAuth } from "@/shared/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { isAuthenticate } = useAuth();
  return isAuthenticate ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
