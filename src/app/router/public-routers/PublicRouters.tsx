import { useAuth } from "@/shared/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { isAuthenticate } = useAuth();
  return isAuthenticate === false ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
