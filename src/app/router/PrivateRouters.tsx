import useAuth from "@/shared/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const isLoggedIn = useAuth();
  return isLoggedIn === true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
