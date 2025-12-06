import { ImageUpload } from "@/features";
import { useAdminPatientView } from "@/shared/hooks/admin-patient-view/useAdminPatientView";
import { CLONE_PATIENT_SCHEMA } from "@/shared/redux/features/admin/clone-patient/clonePatient.type";
import { useCreateClonePatientMutation } from "@/shared/redux/features/admin/clone-patient/clonePatientApi";
import {
  Button,
  ControlInput,
  ControlledSelect,
  Panel,
  PanelHeading,
} from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ClonePatient = () => {
  const navigate = useNavigate();
  const { patient, flattenedAttachments } = useAdminPatientView();
  const [createClonePatient, { isLoading: isCloneCreating }] =
    useCreateClonePatientMutation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(CLONE_PATIENT_SCHEMA),
    values: {
      attachment: flattenedAttachments,
      patient_id: patient?.patient_id || "",
      name: patient?.name || "",
      age: patient?.age || "",
      gender: patient?.gender || "",
      history: patient?.history || "",
      xray_name: patient?.xray_name || "",
      ref_doctor: patient?.ref_doctor || "",
      image_type: patient?.image_type || "Single",
    },
    mode: "onChange",
  });
  const onSubmit = handleSubmit(async (values) => {
    try {
      const formValues = {
        attachment: values.attachment,
        patient_id: values.patient_id,
        name: values.name,
        age: values.age,
        gender: values.gender,
        history: values.history,
        xray_name: values.xray_name,
        ref_doctor: values.ref_doctor,
        image_type: values.image_type,
        rtype: patient?.rtype || "xray",
        study_for: patient?.study_for || "xray_dr",
        status: patient?.status || "pending",
        doctor_id: patient?.doctor_id || [],
        ignore_dr: patient?.ignore_dr || [],
        customer_id: patient?.agent_id._id || "",
      };
      await createClonePatient(formValues).unwrap();
      navigate("/admin/patient");
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <div className="w-full">
      <Panel
        header={<PanelHeading title="Clone Report" button=" " path=" " />}
        size="lg"
      >
        <form className=" w-full flex flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <ImageUpload control={control} name="attachment" isNote={false} />
          </div>
          <ControlInput
            label="Patient Id"
            placeholder="Patient Id"
            size="sm"
            name="patient_id"
            control={control}
            isInputLabel={false}
          />
          <ControlInput
            label="Patient Name"
            placeholder="Patient Name"
            size="sm"
            name="name"
            control={control}
            isInputLabel={false}
          />
          <ControlInput
            label="Patient AGe"
            placeholder="Patient Age"
            size="sm"
            name="age"
            control={control}
            isInputLabel={false}
          />
          <ControlledSelect
            control={control}
            name="gender"
            label="Gender"
            isInputLabel={false}
            options={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
            ]}
          />
          <ControlInput
            label="Patient History"
            placeholder="Patient History"
            size="sm"
            name="history"
            control={control}
            isInputLabel={false}
          />
          <ControlInput
            label="X-ray Name"
            placeholder="X-ray Name"
            size="sm"
            name="xray_name"
            control={control}
            isInputLabel={false}
          />
          <ControlInput
            label="Reference Doctor"
            placeholder="Reference Doctor"
            size="sm"
            name="ref_doctor"
            control={control}
            isInputLabel={false}
          />

          <ControlledSelect
            control={control}
            name="image_type"
            label="Image Category"
            isInputLabel={false}
            options={[
              { name: "Single", value: "single" },
              { name: "Double", value: "double" },
              { name: "Multiple", value: "multiple" },
            ]}
          />

          {/* <div className="flex flex-col gap-1">
            <DoctorMultiSelector
              control={control}
              name="doctor_id"
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
          </div> */}

          <Button
            size="size-2"
            type="submit"
            width="full"
            loading={isCloneCreating}
          >
            {isCloneCreating ? "Cloning Patient..." : "Clone Patient"}
          </Button>
        </form>
      </Panel>
    </div>
  );
};

export default ClonePatient;
