import { ImageUpload } from "@/features";
import { useAdminPatientView } from "@/shared/hooks/admin-patient-view/useAdminPatientView";
import { ADMIN_UPDATE_PATIENT_SCHEMA } from "@/shared/redux/features/admin/admin-update-pateint/adminUpdatePateint.type";
import { useAdminUpdatePatientMutation } from "@/shared/redux/features/admin/admin-update-pateint/adminUpdatePateintApi";
import {
  Button,
  ControlInput,
  ControlledSelect,
  Panel,
  PanelHeading,
} from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const AdminUpdatePatientForm = () => {
  const navigate = useNavigate();
  const { patient_id } = useParams<{ patient_id: string }>();
  const { patient, flattenedAttachments } = useAdminPatientView();

  // update api
  const [resetCount, setResetCount] = useState<number>(0);
  const [adminUpdatePatient, { isLoading: isPatientUpdating }] =
    useAdminUpdatePatientMutation();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(ADMIN_UPDATE_PATIENT_SCHEMA),
    values: {
      attachment: flattenedAttachments,
      history: patient?.history || "",
      xray_name: patient?.xray_name || "",
      name: patient?.name || "",
      rtype: patient?.rtype || "xray",
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const submitData = {
        attachment: values.attachment,
        history: values.history,
        xray_name: values.xray_name,
        name: values.name,
        rtype: values.rtype,

        study_for: patient?.study_for || "xray_dr",
        age: patient?.age,
        gender: patient?.gender,
        ref_doctor: patient?.ref_doctor,
        image_type: patient?.image_type || "Single",
      };
      await adminUpdatePatient({
        patient_id,
        data: submitData,
      }).unwrap();
      setResetCount((prev) => prev + 1);

      navigate("/admin/patient");

    } catch (error) {
      console.error(error);
    }
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
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Upload Image */}
          <div>
            <ImageUpload
              control={control}
              name="attachment"
              isNote={false}
              key={resetCount}
            />
          </div>
          {/* Patient History*/}
          <ControlInput
            label="Patient History"
            placeholder="Patient History"
            size="sm"
            name="history"
            control={control}
            isInputLabel={false}
          />

          {/* X-ray Name*/}
          <ControlInput
            label="X-ray Name"
            placeholder="X-ray Name"
            size="sm"
            name="xray_name"
            control={control}
            isInputLabel={false}
          />
          {/* X-ray Name*/}
          <ControlInput
            label="Name"
            placeholder="Name"
            size="sm"
            name="name"
            control={control}
            isInputLabel={false}
          />
          <ControlledSelect
            control={control}
            name="rtype"
            label="R Type"
            isInputLabel={false}
            options={[
              { name: "Xray", value: "xray" },
              { name: "ECG", value: "ecg" },
              { name: "DCM", value: "dcm" },
              { name: "CTSCAN", value: "ctscan" },
            ]}
          />

          <Button
            type="submit"
            size="size-2"
            width="full"
            loading={isPatientUpdating}
            disabled={!isDirty || isPatientUpdating}
          >
            {isPatientUpdating ? "Updating Patient..." : "Update Patient"}
          </Button>
        </form>
      </Panel>
    </div>
  );
};

export default AdminUpdatePatientForm;
