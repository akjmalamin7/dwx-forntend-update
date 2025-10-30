import { DoctorMultiSelector, ImageUpload } from "@/features";
import { Button, Input, Panel, PanelHeading, Select } from "@/shared/ui";
import { useForm } from "react-hook-form";

const ClonePatient = () => {
  const { control } = useForm();
  return (
    <div className="w-full">
      <Panel
        header={<PanelHeading title="Clone Report" button=" " path=" " />}
        size="lg"
      >
        <form className=" w-full flex flex-col gap-4">
          <div>
            <ImageUpload control={control} name="attachment" isNote={false} />
          </div>
          <Input
            size="sm"
            label="Patient Id"
            name="patient_id"
            placeholder="Patient Id"
          />
          <Input
            size="sm"
            label="Patient Name"
            name="name"
            placeholder="Patient Name"
          />
          <Input
            size="sm"
            label="Patient Age"
            name="age"
            placeholder="Patient Age"
          />
          <Select
            size="sm"
            label="Gender"
            name="gender"
            options={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
            ]}
          />
          <Input
            size="sm"
            label="Patient History"
            name="history"
            placeholder="Patient History"
          />
          <Input
            size="sm"
            label="X-ray Name"
            name="xray_name"
            placeholder="X-ray Name"
          />
          <Input
            size="sm"
            label="Reference Doctor"
            name="ref_doctor"
            placeholder="Reference Doctor"
          />
          <Select
            size="sm"
            label="Image Category"
            name="image_type"
            options={[
              { name: "Single", value: "single" },
              { name: "Double", value: "double" },
              { name: "Multiple", value: "multiple" },
            ]}
          />
          <div className="flex flex-col gap-1">
            <DoctorMultiSelector
              control={control}
              name="doctor_ids"
              label="Selected Doctor"
              weight="font-regular"
            />
          </div>
          <div className="flex flex-col gap-1">
            <DoctorMultiSelector
              control={control}
              name="ignore_dr"
              label="Ignore Doctor"
              weight="font-regular"
            />
          </div>

          <Button size="size-2" type="submit" width="full">
            Submit
          </Button>
        </form>
      </Panel>
    </div>
  );
};

export default ClonePatient;
