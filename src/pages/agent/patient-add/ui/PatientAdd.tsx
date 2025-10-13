

import { DoctorMultiSelector, ImageUpload, PatientHistorySelect, ReferenceDoctorSelect, XRrayNameSelect } from "@/features";
import { patientFormschema, type PatientFormValues } from "@/shared/redux/features/agent/add-patient/addPatient.types";
import { useCreatePatientMutation } from "@/shared/redux/features/agent/patient/patientApi";
import { Button, Input, Panel, Select, Text } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

const PatientAdd = () => {
  const [createPatient] = useCreatePatientMutation();

  const {
    register,
    control,
    handleSubmit,
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
      const result = await createPatient(finalData).unwrap();
      console.log("Patient Created:", result);
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
          />
          {errors.patient_id && (
            <Text element="p" size="sm" color="danger">
              {errors.patient_id.message}
            </Text>
          )}
        </div>

        {/* Patient Name */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient Name
          </Text>
        </div>
        <div className="col-span-9">
          <Input size="sm" placeholder="Patient Name" {...register("name")} />
          {errors.name && (
            <Text element="p" size="sm" color="danger">
              {errors.name.message}
            </Text>
          )}
        </div>

        {/* Patient Age */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient Age
          </Text>
        </div>
        <div className="col-span-9">
          <Input size="sm" placeholder="Patient Age" {...register("age")} />
          {errors.age && (
            <Text element="p" size="sm" color="danger">
              {errors.age.message}
            </Text>
          )}
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
                  { name: "Choose one", value: "" },
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                ]}
                value={field.value}
                onSelect={field.onChange}
              />
            )}
          />
          {errors.gender && (
            <Text element="p" size="sm" color="danger">
              {errors.gender.message}
            </Text>
          )}
        </div>

        {/* Patient History */}
        <Controller
          control={control}
          name="history"
          render={({ field }) => (
            <PatientHistorySelect
              label="Patient History"
              onSelectedValue={(val) => field.onChange(val)}
            />
          )}
        />
        {errors.history && (
          <Text element="p" size="sm" color="danger" className="col-span-12">
            {errors.history.message}
          </Text>
        )}

        {/* X-ray Name */}
        <Controller
          control={control}
          name="xray_name"
          render={({ field }) => (
            <XRrayNameSelect
              label="X-ray Name"
              onSelectedValue={(val) => field.onChange(val)}
            />
          )}
        />
        {errors.xray_name && (
          <Text element="p" size="sm" color="danger" className="col-span-12">
            {errors.xray_name.message}
          </Text>
        )}

        {/* Reference Doctor */}
        <Controller
          control={control}
          name="ref_doctor"
          render={({ field }) => (
            <ReferenceDoctorSelect
              label="Reference Doctor"
              onSelectedValue={(val) => field.onChange(val)}
            />
          )}
        />
        {errors.ref_doctor && (
          <Text element="p" size="sm" color="danger" className="col-span-12">
            {errors.ref_doctor.message}
          </Text>
        )}

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
              />
            )}
          />
          {errors.image_type && (
            <Text element="p" size="sm" color="danger">
              {errors.image_type.message}
            </Text>
          )}
        </div>

        {/* Doctor MultiSelectors */}
        <Controller
          control={control}
          name="selected_drs_id"
          render={({ field }) => (
            <DoctorMultiSelector
              label="Select Doctor"
              onSelect={(val) => field.onChange(val)}
            />
          )}
        />

        <Controller
          control={control}
          name="ignored_drs_id"
          render={({ field }) => (
            <DoctorMultiSelector
              label="Ignore Doctor"
              onSelect={(val) => field.onChange(val)}
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
          // loading={isLoading}
          // disabled={!isValid}
          >
            Submit
            {/* {isLoading ? "Submitting" : "Submit"} */}
          </Button>
        </div>
      </form>
    </Panel>
  );
};

export default PatientAdd;
