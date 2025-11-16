import {
  DoctorMultiSelector,
  ImageUpload,
  PatientHistorySelect,
  ReferenceDoctorSelect,
  XRrayNameSelect,
} from "@/features";
import {
  ReadTextFile,
  type ParsedPatientData,
} from "@/features/read-text-file";
import { useAddPatientMutation } from "@/shared/redux/features/agent/add-patient/addPatientApi";

import { Button, ControlInput, ControlledSelect, Panel } from "@/shared/ui";
import { patientFormschema } from "@/shared/utils/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const PatientQuickAdd = () => {
  const [createPatient, { isLoading }] = useAddPatientMutation();
  const [resetCount, setResetCount] = useState<number>(0);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientFormschema),
    defaultValues: {
      attachment: [],
      rtype: "xray",
      study_for: "xray_dr",
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
  const handleParsed = (data: ParsedPatientData) => {
    setValue("patient_id", data.patient_id);
    setValue("name", data.name);
    setValue("age", data.age);
    setValue(
      "gender",
      data.gender.toLowerCase() === "female" ? "female" : "male"
    );
    setValue("xray_name", data.xray_name);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPatient(data).unwrap();
      setResetCount((prev) => prev + 1);
      reset();
    } catch (err: unknown) {
      console.error("Error creating patient:", err);
    }
  });
  return (
    <Panel header="Quick Add Report">
      <form
        className="grid grid-cols-12 gap-y-4 items-center"
        onSubmit={onSubmit}
      >
        {/* Patient ID */}
        <ImageUpload key={resetCount} control={control} name="attachment" />

        {/* Patient ID */}
        <ReadTextFile onParsed={handleParsed} />

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
          label="Ignored Doctor"
          control={control}
          name="ignored_drs_id"
          useIgnored
        />

        {/* Submit */}
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <Button
            color="dark"
            size="size-2"
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Panel>
  );
};

export default PatientQuickAdd;
