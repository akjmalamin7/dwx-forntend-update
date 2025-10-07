import { userLoggedIn } from "@/shared/redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      try {
        if (auth?.access_token) {
          dispatch(
            userLoggedIn({
              access_token: auth.access_token,
            })
          );
        }
      } catch (err) {
        console.error("Error parsing auth data from localStorage:", err);
      }
    }
    setAuthChecked(true);
  }, [dispatch]);
  return authChecked;
}
