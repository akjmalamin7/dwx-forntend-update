
import AdminFormatForm from "@/entities/doctor-format-form/AdminFormatForm";
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
          path="/admin/formats"
        />
      }
    >
      <AdminFormatForm isUpdate={true} />
    </Panel>
  );
};

export default UpdateFormat;
