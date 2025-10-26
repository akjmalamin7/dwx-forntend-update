import { useAuth } from "@/shared/hooks";
import { Pages } from "@/widgets";
const RoleBasedHome = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case "admin":
      return <h1>Admin Dashboard</h1>;
    case "ecg_dr":
    case "xray_dr":
      return <Pages.DoctorPendingPatient />;
    case "user":
    default:
      return <Pages.Patients />;
  }
};

export default RoleBasedHome;
