import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        const { access_token } = parsedAuth;

        if (access_token) {
          const base64Url = access_token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );

          const decodedUser = JSON.parse(jsonPayload);


          dispatch(
            userLoggedIn({
              access_token: access_token,
              user: decodedUser,
            })
          );
        }
      } catch (error) {
        console.error('AuthInitializer - Error:', error);
        localStorage.removeItem("auth");
      }
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthInitializer;