import { PendingPatientsList } from "@/entities/doctor";
import { AgentFormError } from "@/features/agent/agent-form-error";
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

  if (status === "inactive") {
    return (
      <AgentFormError title="Something went wrong!. Please contact with support." />
    );
  }
  return <PendingPatientsList />;
};

export default PatientPending;
