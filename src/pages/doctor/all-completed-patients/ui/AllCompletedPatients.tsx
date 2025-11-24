import { AllCompletedPatientList } from "@/entities/doctor";
import { usePageTitle } from "@/shared/hooks";

const AllCompletedPatients = () => {
  usePageTitle("This Month All Completed Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return <AllCompletedPatientList />;
};

export default AllCompletedPatients;
