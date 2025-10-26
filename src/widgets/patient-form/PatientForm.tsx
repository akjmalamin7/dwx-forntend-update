// features/patient-form/PatientForm.tsx
import {
  DoctorMultiSelector,
  ImageUpload,
  PatientHistorySelect,
  ReferenceDoctorSelect,
  XRrayNameSelect,
} from "@/features";
import { useJWT } from "@/shared/hooks";
import { useGetProfileSelectDoctorIdQuery } from "@/shared/redux/features/profile/profileApi";
import { Button, ControlInput, ControlledSelect } from "@/shared/ui";
import {
  patientFormschema,
  type PatientFormValues,
} from "@/shared/utils/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

interface PatientFormProps {
  onSubmit: SubmitHandler<PatientFormValues>;
  isLoading?: boolean;
  defaultValues?: Partial<PatientFormValues>;
  isEdit?: boolean;
  resetCount?: number;
}

// Export form methods for parent component access
export type PatientFormMethods = UseFormReturn<PatientFormValues>;

const PatientForm = ({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  resetCount = 0,
}: PatientFormProps) => {
  const decoded = useJWT();
  const userId: string | undefined = decoded?.id;
  const { data: profileData } = useGetProfileSelectDoctorIdQuery(
    userId ?? skipToken
  );
  const methods = useForm<PatientFormValues>({
    mode: "onChange",
    resolver: yupResolver(patientFormschema),
    defaultValues: {
      attachment: [],
      rtype: "",
      study_for: "",
      selected_drs_id: profileData?.selected_dr || [],
      ignored_drs_id: profileData?.ignored_dr || [],
      patient_id: "",
      name: "",
      age: "",
      history: "",
      gender: "male",
      xray_name: "",
      ref_doctor: "",
      image_type: "single",
      ...defaultValues,
    },
  });

  const {
    control,
    reset,
    getValues,
    formState: { errors, isValid },
  } = methods;
  useEffect(() => {
    if (isEdit && defaultValues) {
      methods.reset({
        attachment: defaultValues.attachment || [],
        patient_id: defaultValues.patient_id || "",
        name: defaultValues.name || "",
        age: defaultValues.age || "",
        history: defaultValues.history || "",
        gender: defaultValues.gender || "male",
        xray_name: defaultValues.xray_name || "",
        ref_doctor: defaultValues.ref_doctor || "",
        image_type: defaultValues.image_type || "single",
        selected_drs_id: defaultValues.selected_drs_id || [],
        ignored_drs_id: defaultValues.ignored_drs_id || [],
        rtype: defaultValues.rtype || "xray",
        study_for: defaultValues.study_for || "xray_dr",
      });
    }
  }, [isEdit, defaultValues, methods]);

  // reset data only add mode
  useEffect(() => {
    if (resetCount > 0 && !isEdit) {
      reset({
        attachment: [],
        patient_id: "",
        name: "",
        age: "",
        history: "",
        gender: "male",
        xray_name: "",
        ref_doctor: "",
        image_type: "single",
        selected_drs_id: profileData?.selected_dr || [],
        ignored_drs_id: profileData?.ignored_dr || [],
      });
    }
  }, [resetCount, reset, profileData, isEdit]);

  // load profile data
  useEffect(() => {
    if (profileData) {
      const currentValues = getValues();
      if (
        !currentValues.selected_drs_id?.length &&
        !currentValues.ignored_drs_id?.length
      ) {
        reset({
          ...currentValues,
          selected_drs_id: profileData.selected_dr || [],
          ignored_drs_id: profileData.ignored_dr || [],
        });
      }
    }
  }, [profileData, reset, getValues]);

  const handleSubmit: SubmitHandler<PatientFormValues> = async (data) => {
    try {
      await onSubmit(data);
    } catch (err: unknown) {
      console.error("Error creating patient:", err);
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-12 gap-y-4 items-center"
        onSubmit={methods.handleSubmit(handleSubmit)}
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
          label="Ignored Doctor"
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
            {isLoading ? "Submitting" : isEdit ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PatientForm;
