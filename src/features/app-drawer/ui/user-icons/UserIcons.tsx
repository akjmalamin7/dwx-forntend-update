import { useAuth } from "@/shared/hooks";
import { FaUser, FaUserMd } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
const UserIcons = () => {
  const { user } = useAuth();
  let ICONJSX: React.ReactNode = null;
  switch (user?.role) {
    case "admin":
      ICONJSX = <GrUserAdmin className="w-[16px]! h-[16px]!" />;
      break;
    case "xray_dr":
      ICONJSX = <FaUserMd className="w-[16px]! h-[16px]!" />;
      break;
    case "ecg_dr":
      ICONJSX = <FaUserMd className="w-[16px]! h-[16px]!" />;
      break;
    default:
      ICONJSX = <FaUser className="w-[16px]! h-[16px]!" />;
      break;
  }
  return ICONJSX;
};
export default UserIcons;
