import { userLoggedOut } from "@/shared/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/mutation";

export default function useLoggedOut() {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoggedOut = async () => {
    try {
      await logout().unwrap();
      dispatch(userLoggedOut());
      localStorage.removeItem("auth");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout API failed, continuing logout:", error);
    }
  };

  return { handleLoggedOut };
}
