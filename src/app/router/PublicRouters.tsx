import { useAuth } from "@/shared/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const isLoggedIn = useAuth();
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
