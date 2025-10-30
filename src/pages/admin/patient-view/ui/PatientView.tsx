import {
  AddNewImageForm,
  AdminUpdatePatientForm,
  ClonePatient,
} from "@/entities";
import { Panel, PanelHeading } from "@/shared/ui";
import "viewerjs/dist/viewer.css";
import { PatientInformation } from "./patient-iformation";

const PatientView = () => {
  return (
    <Panel
      header={
        <PanelHeading
          title="Patient View"
          button="Back to Patient List"
          path="/agent/patient-completed"
        />
      }
      size="lg"
    >
      <PatientInformation />
      <div className="flex flex-col-reverse lg:flex-row w-full mt-8 gap-6">
        <div className="flex-1/2">
          <ClonePatient />
        </div>
        <div className="flex-1/2 flex flex-col gap-6">
          <AddNewImageForm />
          <AdminUpdatePatientForm />
        </div>
      </div>
    </Panel>
  );
};

export default PatientView;
