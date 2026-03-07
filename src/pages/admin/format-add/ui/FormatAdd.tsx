 
import AdminFormatForm from "@/entities/doctor-format-form/AdminFormatForm";
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
      <AdminFormatForm />
    </Panel>
  );
};

export default FormatAdd;
