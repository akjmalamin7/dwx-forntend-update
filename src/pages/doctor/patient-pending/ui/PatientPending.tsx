import { PendingPatientsList } from "@/entities/doctor";
import { usePageTitle } from "@/shared/hooks";

const PatientPending = () => {
  usePageTitle("Pending Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return <PendingPatientsList />;
};

export default PatientPending;
