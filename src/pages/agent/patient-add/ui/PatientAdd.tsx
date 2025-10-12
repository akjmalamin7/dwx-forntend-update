import { DoctorMultiSelector, ImageUpload, PatientHistorySelect, ReferenceDoctorSelect, XRrayNameSelect } from "@/features";
import {
  Button,
  ControlledSelect,
  Input,
  Panel,
  Select,
  Text
} from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {
  Controller,
  useForm,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";
import * as yup from "yup";

export interface PatientFormValues {
  file: FileList | null;
  patientId: string;
  patientName: string;
  patientAge: string;
  patientSex: string;
  patientHistory: string;
  xrayName: string;
  referenceDoctor: string;
  imageCategory: string;
  selectDoctor: string[];
  ignoreDoctor: string[];
}

// Yup validation schema
const schema = yup.object().shape({
  file: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return false; // required check
      const fileList = value as FileList;
      return fileList[0]?.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Only images are allowed", (value) => {
      if (!value) return false;
      const fileList = value as FileList;
      return ["image/jpeg", "image/png"].includes(fileList[0]?.type);
    }),

  patientId: yup.string().required("Patient ID is required"),
  patientName: yup.string().required("Patient name is required"),
  patientAge: yup
    .number()
    .typeError("Patient age must be a number")
    .required("Patient age is required")
    .min(0, "Age cannot be negative")
    .max(120, "Age cannot be more than 120"),
  patientSex: yup.string().required("Patient sex is required"),
  patientHistory: yup.string().required("Patient history is required"),
  xrayName: yup.string().required("X-ray name is required"),
  referenceDoctor: yup.string().required("Reference doctor is required"),
  imageCategory: yup.string().required("Image category is required"),
  selectDoctor: yup.array().min(1, "Select at least one doctor"),
  ignoreDoctor: yup.array(),
});
const resolver = yupResolver(schema) as unknown as Resolver<PatientFormValues>;
const PatientAdd = () => {
  const [selectDr, setSelectDr] = useState<string[]>([]);
  const [ignoreDr, setIgnoreDr] = useState<string[]>([]);
  console.log("selectDr", selectDr);
  console.log("ignoreDr", ignoreDr);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver,
    defaultValues: {
      file: null,
      patientId: "",
      patientName: "",
      patientAge: "",
      patientSex: "",
      patientHistory: "",
      xrayName: "",
      referenceDoctor: "",
      imageCategory: "",
      selectDoctor: [],
      ignoreDoctor: [],
    },
  });

  const onSubmit: SubmitHandler<PatientFormValues> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Panel header="Add Xray Report">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-y-4 items-center"
      >
        {/* Upload Image */}

        <ImageUpload />
        {/* <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Upload Image
          </Text>
        </div>
        <div className="col-span-9">
          <Text element="p" color="danger" size="md" fontWeight="medium">
            Note: Please upload image first then type patient information,
            please wait sometime for showing the preview image
          </Text>
          <InputFile
            size="sm"
            type="file"
            {...register("file")}
            className="w-full"
          />
          {errors.file && (
            <Text color="danger" size="sm">
              {errors.file.message}
            </Text>
          )}
        </div> */}

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
            {...register("patientId")}
          />
        </div>

        {/* Patient Name */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient Name
          </Text>
        </div>
        <div className="col-span-9">
          <Input
            size="sm"
            placeholder="Patient Name"
            {...register("patientName")}
          />
        </div>

        {/* Patient Age */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient Age
          </Text>
        </div>
        <div className="col-span-9">
          <Input
            size="sm"
            placeholder="Patient Age"
            {...register("patientAge")}
          />
        </div>

        {/* Patient Sex */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient Sex
          </Text>
        </div>
        <div className="col-span-9">
          <ControlledSelect<PatientFormValues>
            name="patientSex"
            control={control}
            options={[
              { name: "Choose one", value: "" },
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
            ]}
            rules={{ required: "Patient sex is required" }}
          />
        </div>

        {/* Patient History */}
        <Controller
          name="patientHistory"
          control={control}
          rules={{ required: "Patient history is required" }}
          render={({ field }) => (
            <PatientHistorySelect
              label="Patient History"
              onSelectedValue={field.onChange}
              ref={field.ref}
            />
          )}
        />


        {/* X-ray Name */}
        <Controller
          name="patientHistory"
          control={control}
          rules={{ required: "Patient history is required" }}
          render={({ field }) => (
            <XRrayNameSelect
              label="X-ray Name"
              onSelectedValue={field.onChange}
              ref={field.ref}
            />
          )}
        />


        {/* Reference Doctor */}
        <Controller
          name="referenceDoctor"
          control={control}
          rules={{ required: "Reference doctor required" }}
          render={({ field }) => (
            <ReferenceDoctorSelect
              label="Reference Doctor"
              onSelectedValue={field.onChange}
              ref={field.ref}
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
            name="imageCategory"
            control={control}
            render={({ field }) => (
              <Select
                size="sm"
                options={[
                  { name: "Choose one", value: "" },
                  { name: "Single", value: "single" },
                  { name: "Double", value: "double" },
                  { name: "Multiple", value: "multiple" },
                ]}
                value={field.value}
                onSelect={field.onChange}
              />
            )}
          />
        </div>

        <DoctorMultiSelector label="Select Doctor" onSelect={setSelectDr} />
        <DoctorMultiSelector label="Ignore Doctor" onSelect={setIgnoreDr} />

        {/* Submit */}
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <Button
            color="dark"
            size="size-2"
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </Button>
        </div>
      </form>
    </Panel>
  );
};

export default PatientAdd;
