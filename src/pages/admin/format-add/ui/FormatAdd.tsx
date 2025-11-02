import { DoctorFormatForm } from "@/entities";
import { Panel, PanelHeading } from "@/shared/ui";

const FormatAdd = () => {
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
