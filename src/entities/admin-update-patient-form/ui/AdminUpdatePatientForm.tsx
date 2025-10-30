import { ImageUpload } from "@/features";
import { ADMIN_UPDATE_PATIENT_SCHEMA } from "@/shared/redux/features/admin/admin-update-pateint/adminUpdatePateint.type";
import { Button, Input, Panel, PanelHeading, Select } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const AdminUpdatePatientForm = () => {
  const { control } = useForm({
    resolver: yupResolver(ADMIN_UPDATE_PATIENT_SCHEMA),
    defaultValues: {
      attachment: [], 
      rtype: "xray",
      history: "",
      xray_name: "",
      name: "", 
    },
  });
  return (
    <div className="w-full">
      <Panel
        header={
          <PanelHeading
            title="Update Image [Convert DCM TO Image]"
            button=" "
            path=" "
          />
        }
        size="lg"
      >
        <form className="flex flex-col gap-4">
          {/* Upload Image */}
          <div>
            <ImageUpload control={control} name="attachment" isNote={false} />
          </div>
          {/* Patient History*/}
          <Input
            size="sm"
            label="Patient History"
            placeholder="Patient History"
            name="history"
          />
          {/* X-ray Name*/}
          <Input
            size="sm"
            label="X-ray Name"
            placeholder="X-ray Name"
            name="xray_name"
          />
          {/* X-ray Name*/}
          <Input size="sm" label="Name" placeholder="Name" name="name" />
          <Select
            size="sm"
            label="R Type"
            options={[
              { name: "Xray", value: "xray" },
              { name: "ECG", value: "ecg" },
              { name: "DCM", value: "dcm" },
              { name: "CTSCAN", value: "ctscan" },
            ]}
          />

          <Button type="submit" size="size-2" width="full">
            Submit
          </Button>
        </form>
      </Panel>
    </div>
  );
};

export default AdminUpdatePatientForm;
