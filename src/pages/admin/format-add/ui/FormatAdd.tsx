import { DoctorFormatForm } from "@/entities";
import { usePageTitle } from "@/shared/hooks";
import { Panel, PanelHeading } from "@/shared/ui";

const FormatAdd = () => {

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
          path="/admin/format"
        />
      }
    >
      <DoctorFormatForm />
    </Panel>
  );
};

export default FormatAdd;
