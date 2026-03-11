import { usePageTitle } from "@/shared/hooks";
import { Panel, PanelHeading } from "@/shared/ui";
import "viewerjs/dist/viewer.css";
import { PatientRevInformation } from "./patient-revision-iformation"; 
 

const PatientRevision = () => {
  usePageTitle("Patient View", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });  

  return (
    <Panel
      header={
        <PanelHeading
          title="Patient View"
          button="Back to Patient List"
          path="/admin/patient"
        />
      }
       size="lg" 
    >
      <PatientRevInformation />  
    </Panel>
  );
};

export default PatientRevision;
