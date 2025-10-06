import useAuth from "@/shared/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const isLoggedIn = useAuth();
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
