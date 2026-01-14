import { PendingPatientsList } from "@/entities/doctor";
import { usePageTitle } from "@/shared/hooks";
import { useDoctorProfile } from "@/shared/hooks/use-get-profile/useDoctorProfile";
import { Loader } from "@/shared/ui";

const PatientPending = () => {
  const { status, isProfileLoading } = useDoctorProfile();

  usePageTitle("Pending Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  if (isProfileLoading) return <Loader />;

  console.log("Status check:", status);

  if (status === "inactive") {
    return <div>Your account is inactive.</div>;
  }

  return <PendingPatientsList />;
};

export default PatientPending;
