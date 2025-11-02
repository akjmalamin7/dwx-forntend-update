
import AdminFormatForm from "@/entities/doctor-format-form/AdminFormatForm";
import { Panel, PanelHeading } from "@/shared/ui";

const UpdateFormat = () => {
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
