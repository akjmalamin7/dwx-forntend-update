import { PatientArchiveList } from "@/entities/admin";
import { usePageTitle } from "@/shared/hooks";

const PatientCompleted = () => {
  usePageTitle("Archive Completed Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return <PatientArchiveList />;
};

export default PatientCompleted;
