import { DoctorFormatForm } from "@/entities";
import { usePageTitle } from "@/shared/hooks";
import { Panel, PanelHeading } from "@/shared/ui";

const UpdateFormat = () => {

  usePageTitle("Add Format", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

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
