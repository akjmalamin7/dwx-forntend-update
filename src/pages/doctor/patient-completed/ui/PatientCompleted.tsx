import { CompletedPatients } from "@/entities/doctor";
import { usePageTitle } from "@/shared/hooks";

const PatientCompleted = () => {
  usePageTitle("Completed Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return <CompletedPatients />;
};

export default PatientCompleted;
