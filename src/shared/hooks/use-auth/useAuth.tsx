import type { RootState } from "@/shared/redux/stores/stores";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useJWT } from "../decode-token/useJWT";

export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  const decode = useJWT()


  return useMemo(() => {
    const isAuthenticate = !!(auth && auth?.access_token);

    return {
      isAuthenticate,
      role: decode?.role,
      user: decode,
      hasRole: (requireRole: string | string[]) => {
        if (!decode?.role) return false;
        if (Array.isArray(requireRole)) {
          return requireRole.includes(decode.role)
        }
        return decode.role === requireRole
      }
    }
  }, [auth, decode]);
}