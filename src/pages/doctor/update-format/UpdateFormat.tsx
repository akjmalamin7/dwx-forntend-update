import { DoctorFormatForm } from "@/entities";
import { Panel, PanelHeading } from "@/shared/ui";

const UpdateFormat = () => {
  return (
    <Panel
      header={
        <PanelHeading
          title="Add Format"
          button="Format List"
          path="/doctor/format"
        />
      }
    >
      <DoctorFormatForm isUpdate={true} />
    </Panel>
  );
};

export default UpdateFormat;
