import type { RootState } from "@/shared/redux/stores/stores";
import { useSelector } from "react-redux";
import { useJWT } from "../decode-token/useJWT";
export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  const decode = useJWT()

  return {
    isAuthenticate: (auth && auth?.access_token) ? true : false,
    role: decode?.role
  }
}
