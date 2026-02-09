import { useSendReportMutation } from "@/entities/agent/send-report";
import {
  CustomDoctorMultiSelector,
  ImageUpload,
  SelectCustomPatientHistory,
  SelectCustomReferenceDoctor,
  SelectCustomXrayName,
} from "@/features";
import { AgentFormError } from "@/features/agent/agent-form-error";
import {
  ReadTextFile,
  type ParsedPatientData,
} from "@/features/read-text-file";
import { usePageTitle } from "@/shared/hooks";
import { useGetProfile } from "@/shared/hooks/use-get-profile/useGetProfile";
import {
  Button,
  ControlInput,
  ControlledSelect,
  Loader,
  Panel,
} from "@/shared/ui";
import { patientFormschema } from "@/shared/utils/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const QuickSendReprt = () => {
  const { status, isProfileLoading } = useGetProfile();
  const [createSendReport, { isLoading }] = useSendReportMutation();
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
      small_url: [],
      rtype: "xray",
      study_for: "xray_dr",
      doctor_id: [],
      ignore_dr: [],
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


    const normalizeGender = (gender?: string) => {
      if (!gender) return "male";  

      const g = gender.toLowerCase().trim();

      if (g === "m" || g === "male") return "male";
      if (g === "f" || g === "female") return "female";

      return "male"; 
  };

  const handleParsed = (data: ParsedPatientData) => {
 
    setValue("patient_id", data.patient_id);
    setValue("name", data.name);
    setValue("age", data.age);
    setValue("gender", normalizeGender(data.gender));
   
    setValue("xray_name", data.xray_name);
  };
  const onSubmit = handleSubmit(async (data) => {
 
    try {
     
      await createSendReport(data).unwrap();
      setResetCount((prev) => prev + 1);
      reset();
      
    } catch (err: unknown) {
      console.error("Error creating patient:", err);
    }
  });

  usePageTitle("Quick Add Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  if (isProfileLoading) <Loader />;

  if (status !== "active") {
    return (
      <AgentFormError title="Something went wrong!. Please contact with support." />
    );
  }

  return (
    <Panel header="Quick Add Report">
      <form
        className="grid grid-cols-12 gap-y-4 items-center"
        onSubmit={onSubmit}
      >
        {/* Patient ID */}
        <ImageUpload
          key={resetCount}
          setValue={setValue}
          control={control}
          name="attachment"
        />

        {/* Patient ID */}
        <ReadTextFile onParsed={handleParsed} setIndex={Math.random()} />

        {/* Patient ID */}
        <div className="hidden">
          <ControlInput
            control={control}
            size="sm"
            label="Patient ID"
            placeholder="Patient Id"
            name="patient_id"
          />
        </div>

        {/* Patient Name */}
        <div className="hidden">
          <ControlInput
            control={control}
            size="sm"
            label="Patient Name"
            placeholder="Patient Name"
            name="name"
          />
        </div>

        {/* Patient Age */}
        <div className="hidden">
          <ControlInput
            control={control}
            size="sm"
            label="Patient Age"
            placeholder="Patient Age"
            name="age"
          />
        </div>

        {/* Gender */}
        <div className="hidden">
          <ControlledSelect
            label="Patient Sex"
            control={control}
            name="gender"
            options={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
            ]}
          />
        </div>
        {/* Patient History */}
        <Controller
          control={control}
          name="history"
          render={({ field }) => (
            <SelectCustomPatientHistory
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
        <div className="hidden">
          <Controller
            control={control}
            name="xray_name"
            render={({ field }) => (
              <SelectCustomXrayName
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
        </div>

        {/* Reference Doctor */}
        <Controller
          control={control}
          name="ref_doctor"
          render={({ field }) => (
            <SelectCustomReferenceDoctor
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
        <div className="hidden">
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
        </div>

        {/* Doctor MultiSelectors */}

        <CustomDoctorMultiSelector
          control={control}
          name="doctor_id"
          label="Selected Doctor"
          useIgnored={false}
          setValue={setValue}
        />

        <CustomDoctorMultiSelector
          control={control}
          name="ignore_dr"
          useIgnored
          label="Ignored Doctor"
          setValue={setValue}
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

export default QuickSendReprt;
