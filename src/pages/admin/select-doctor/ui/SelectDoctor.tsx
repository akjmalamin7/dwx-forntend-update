import { AdminSelectedDoctor } from "@/entities";
import { Panel, PanelHeading } from "@/shared/ui";

const SelectDoctor = () => {
  return (
    <Panel
      header={<PanelHeading title="Select Doctor" button="" path="/" />}
      size="lg"
    >
      <AdminSelectedDoctor />
    </Panel>
  );
};

export default SelectDoctor;
