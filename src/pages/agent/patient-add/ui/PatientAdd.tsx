import {
  DoctorMultiSelector,
  ImageUpload,
  PatientHistorySelect,
  ReferenceDoctorSelect,
  XRrayNameSelect,
} from "@/features";
import { useAddPatientMutation } from "@/shared/redux/features/agent/add-patient/addPatientApi";
import { Button, ControlInput, ControlledSelect, Panel } from "@/shared/ui";
import {
  patientFormschema,
  type PatientFormValues,
} from "@/shared/utils/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

const PatientAdd = () => {
  const [createPatient, { isLoading }] = useAddPatientMutation();
  const [resetCount, setResetCount] = useState<number>(0);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PatientFormValues>({
    mode: "onChange",
    resolver: yupResolver(patientFormschema),
    defaultValues: {
      attachment: [],
      rtype: "",
      study_for: "",
      selected_drs_id: [],
      ignored_drs_id: [],
      patient_id: "",
      name: "",
      age: "",
      history: "",
      gender: "male",
      xray_name: "",
      ref_doctor: "",
      image_type: "single",
    },
  });

  const onSubmit: SubmitHandler<PatientFormValues> = async (data) => {
    const finalData = {
      ...data,
      rtype: "xray",
      study_for: "xray_dr",
    };

    try {
      await createPatient(finalData).unwrap();
      reset();
      setResetCount((prev) => prev + 1);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating patient:", e.data?.message || e.message);
      } else {
        console.error("Error creating patient:", String(err));
      }
    }
  };

  return (
    <Panel header="Add X-ray Report">
      <form
        className="grid grid-cols-12 gap-y-4 items-center"
        onSubmit={handleSubmit(onSubmit, (errros) => console.log(errros))}
      >
        {/* Upload Image */}
        <ImageUpload key={resetCount} control={control} name="attachment" />

        {/* Patient ID */}
        <ControlInput
          control={control}
          size="sm"
          label="Patient ID"
          placeholder="Patient Id"
          name="patient_id"
        />

        {/* Patient Name */}

        <ControlInput
          control={control}
          size="sm"
          label="Patient Name"
          placeholder="Patient Name"
          name="name"
        />

        {/* Patient Age */}

        <ControlInput
          control={control}
          size="sm"
          label="Patient Age"
          placeholder="Patient Age"
          name="age"
        />

        {/* Gender */}
        <ControlledSelect
          label="Patient Sex"
          control={control}
          name="gender"
          options={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
          ]}
        />

        {/* Patient History */}
        <Controller
          control={control}
          name="history"
          render={({ field }) => (
            <PatientHistorySelect
              label="Patient History"
              value={field.value}
              onSelectedValue={(val) => field.onChange(val)}
              error={{
                status: !!errors.history,
                message: errors.history?.message as string,
              }}
            />
          )}
        />

        {/* X-ray Name */}
        <Controller
          control={control}
          name="xray_name"
          render={({ field }) => (
            <XRrayNameSelect
              label="X-ray Name"
              value={field.value}
              onSelectedValue={(val) => field.onChange(val)}
              error={{
                status: !!errors.xray_name,
                message: errors.xray_name?.message as string,
              }}
            />
          )}
        />

        {/* Reference Doctor */}
        <Controller
          control={control}
          name="ref_doctor"
          render={({ field }) => (
            <ReferenceDoctorSelect
              label="Reference Doctor"
              value={field.value}
              onSelectedValue={(val) => field.onChange(val)}
              error={{
                status: !!errors.ref_doctor,
                message: errors.ref_doctor?.message as string,
              }}
            />
          )}
        />

        {/* Image Category */}
        <ControlledSelect
          label="Image Category"
          control={control}
          name="image_type"
          options={[
            { name: "Single", value: "single" },
            { name: "Double", value: "double" },
            { name: "Multiple", value: "multiple" },
          ]}
        />

        {/* Doctor MultiSelectors */}

        <DoctorMultiSelector
          label="Selected Doctor"
          control={control}
          name="selected_drs_id"
        />
        <DoctorMultiSelector
          label="Ignored Dcotor"
          control={control}
          name="ignored_drs_id"
          useIgnored
        />

        {/* Submit */}
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <Button
            type="submit"
            color="dark"
            size="size-2"
            loading={isLoading}
            disabled={!isValid}
          >
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </div>
      </form>
    </Panel>
  );
};

export default PatientAdd;
