
import { useAuth } from "@/shared/hooks";
import { Pages } from "./lazy-pages";

const RoleBasedHome = () => {
  const { user } = useAuth();

  console.log('RoleBasedHome - User Role:', user?.role);

  switch (user?.role) {
    case 'admin':
      return <h1>Admin Dashboard</h1>;
    case 'ecg_dr':
    case 'xray_dr':
      return <Pages.DoctorPendingPatient />;
    case 'user':
    default:
      return <Pages.Patients />;
  }
};

export default RoleBasedHome;