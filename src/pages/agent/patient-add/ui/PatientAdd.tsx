

import { DoctorMultiSelector, ImageUpload, PatientHistorySelect, ReferenceDoctorSelect, XRrayNameSelect } from "@/features";
import { useAddPatientMutation } from "@/shared/redux/features/agent/add-patient/addPatientApi";
import { Button, Input, Panel, Select, Text } from "@/shared/ui";
import { patientFormschema, type PatientFormValues } from "@/shared/utils/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

const PatientAdd = () => {
  const [createPatient, { isLoading }] = useAddPatientMutation();
  const [resetCount, setResetCount] = useState<number>(0);
  const {
    register,
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
        <Controller
          control={control}
          name="attachment"
          render={({ field }) => (
            <ImageUpload
              key={resetCount}
              values={field.value}
              onImagesUpload={(urls) => {
                console.log(urls);
                field.onChange(urls);
              }}
            />
          )}
        />
        {errors.attachment && (
          <Text element="p" size="sm" color="danger" className="col-span-12">
            {errors.attachment.message}
          </Text>
        )}

        {/* Patient ID */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient ID
          </Text>
        </div>
        <div className="col-span-9">
          <Input
            size="sm"
            placeholder="Patient Id"
            {...register("patient_id")}
            error={{ status: !!errors.patient_id, message: errors.patient_id?.message }}
          />
        </div>

        {/* Patient Name */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient Name
          </Text>
        </div>
        <div className="col-span-9">
          <Input size="sm" placeholder="Patient Name" {...register("name")} error={{ status: !!errors.name, message: errors.name?.message }} />
        </div>

        {/* Patient Age */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient Age
          </Text>
        </div>
        <div className="col-span-9">
          <Input size="sm" placeholder="Patient Age" {...register("age")} error={{ status: !!errors.age, message: errors.age?.message }} />
        </div>

        {/* Gender */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient Sex
          </Text>
        </div>
        <div className="col-span-9">
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select
                size="sm"
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                ]}
                value={field.value}
                onSelect={field.onChange}
                error={{ status: !!errors.gender, message: errors.gender?.message as string }}
              />
            )}
          />
        </div>

        {/* Patient History */}
        <Controller
          control={control}
          name="history"
          render={({ field }) => (
            <PatientHistorySelect
              label="Patient History"
              value={field.value}
              onSelectedValue={(val) => field.onChange(val)}
              error={{ status: !!errors.history, message: errors.history?.message as string }}
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
              error={{ status: !!errors.xray_name, message: errors.xray_name?.message as string }}
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
              error={{ status: !!errors.ref_doctor, message: errors.ref_doctor?.message as string }}
            />
          )}
        />

        {/* Image Category */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Image Category
          </Text>
        </div>
        <div className="col-span-9">
          <Controller
            control={control}
            name="image_type"
            render={({ field }) => (
              <Select
                size="sm"
                options={[
                  { name: "Single", value: "single" },
                  { name: "Double", value: "double" },
                  { name: "Multiple", value: "multiple" },
                ]}
                value={field.value}
                onSelect={field.onChange}
                error={{ status: !!errors.image_type, message: errors.image_type?.message as string }}
              />
            )}
          />
        </div>

        {/* Doctor MultiSelectors */}
        <Controller
          control={control}
          name="selected_drs_id"
          render={({ field }) => (
            <DoctorMultiSelector
              label="Select Doctor"
              value={field.value}
              onSelect={(val) => field.onChange(val)}
              error={{ status: !!errors.selected_drs_id, message: errors.selected_drs_id?.message as string }}
            />
          )}
        />

        <Controller
          control={control}
          name="ignored_drs_id"
          render={({ field }) => (
            <DoctorMultiSelector
              label="Ignore Doctor"
              value={field.value}
              onSelect={(val) => field.onChange(val)}
              error={{ status: !!errors.ignored_drs_id, message: errors.ignored_drs_id?.message as string }}
            />
          )}
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
