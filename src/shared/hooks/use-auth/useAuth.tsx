import type { RootState } from "@/shared/redux/stores/stores";
import { useSelector } from "react-redux";
export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  if (auth && auth?.access_token) {
    return true;
  }
  return false;
}
