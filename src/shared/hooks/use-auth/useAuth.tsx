import type { RootState } from "@/shared/redux/stores/stores";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);


  return useMemo(() => {
    const isAuthenticate = !!(auth?.access_token && auth?.user);
    const user = auth?.user || null;


    return {
      isAuthenticate,
      role: user?.role || null,
      user: user,
      hasRole: (requireRole: string | string[]) => {
        if (!user?.role) {
          console.log('hasRole - No user role found');
          return false;
        }

        const hasRequiredRole = Array.isArray(requireRole)
          ? requireRole.includes(user.role)
          : user.role === requireRole;



        return hasRequiredRole;
      }
    }
  }, [auth]);
}