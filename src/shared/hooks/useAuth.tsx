import type { RootState } from "@/shared/redux/stores/stores";
import { useSelector } from "react-redux";
export default function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  if (auth?.token && auth?.user) {
    return true;
  }
  return false;
}
