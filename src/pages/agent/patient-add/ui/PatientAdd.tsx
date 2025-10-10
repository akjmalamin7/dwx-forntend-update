import { AutoCompleteSelect } from "@/features";
import {
  Button,
  ControlledSelect,
  Input,
  InputFile,
  MultiSelect,
  Panel,
  Select,
  Text,
} from "@/shared/ui";
import type { OptionsType } from "@/shared/utils/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
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

// Options
const referenceDoctorOptions: OptionsType[] = [
  { name: "Choose Reference Dr.", value: "" },
  { name: "Dr Mahfuj", value: "dr_mahfuj" },
  { name: "Dr. Manik", value: "dr_manik" },
];
const xrayNameOptions: OptionsType[] = [
  { name: "Choose x-ray name", value: "" },
  { name: "Chest", value: "chest" },
  { name: "Head", value: "head" },
];
const patientHistoryOptions: OptionsType[] = [
  { name: "Choose patient history", value: "" },
  { name: "Back Pain", value: "back_pain" },
  { name: "Injured", value: "injured" },
];

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
        <div className="col-span-3">
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
        </div>

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
          {errors.patientId && (
            <Text color="danger" size="sm">
              {errors.patientId.message}
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
          <Input
            size="sm"
            placeholder="Patient Name"
            {...register("patientName")}
          />
          {errors.patientName && (
            <Text color="danger" size="sm">
              {errors.patientName.message}
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
          <Input
            size="sm"
            placeholder="Patient Age"
            {...register("patientAge")}
          />
          {errors.patientAge && (
            <Text color="danger" size="sm">
              {errors.patientAge.message}
            </Text>
          )}
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
          render={({ field }) => (
            <AutoCompleteSelect
              label="Patient History"
              options={patientHistoryOptions}
              onSelectedValue={(val) => field.onChange(val)}
            />
          )}
        />
        {errors.patientHistory && (
          <Text color="danger" size="sm">
            {errors.patientHistory.message}
          </Text>
        )}

        {/* X-ray Name */}
        <Controller
          name="xrayName"
          control={control}
          render={({ field }) => (
            <AutoCompleteSelect
              label="X-ray Name"
              options={xrayNameOptions}
              onSelectedValue={(val) => field.onChange(val)}
            />
          )}
        />
        {errors.xrayName && (
          <Text color="danger" size="sm">
            {errors.xrayName.message}
          </Text>
        )}

        {/* Reference Doctor */}
        <Controller
          name="referenceDoctor"
          control={control}
          render={({ field }) => (
            <AutoCompleteSelect
              label="Reference Doctor"
              options={referenceDoctorOptions}
              onSelectedValue={(val) => field.onChange(val)}
            />
          )}
        />
        {errors.referenceDoctor && (
          <Text color="danger" size="sm">
            {errors.referenceDoctor.message}
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
          {errors.imageCategory && (
            <Text color="danger" size="sm">
              {errors.imageCategory.message}
            </Text>
          )}
        </div>

        {/* Select Doctor */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Select Doctor
          </Text>
        </div>
        <div className="col-span-9">
          <Controller
            name="selectDoctor"
            control={control}
            render={({ field }) => (
              <MultiSelect
                size="sm"
                options={referenceDoctorOptions}
                onSelect={(vals) => field.onChange(vals)}
              />
            )}
          />
          {errors.selectDoctor && (
            <Text color="danger" size="sm">
              {errors.selectDoctor.message}
            </Text>
          )}
        </div>

        {/* Ignore Doctor */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Ignore Doctor
          </Text>
        </div>
        <div className="col-span-9">
          <Controller
            name="ignoreDoctor"
            control={control}
            render={({ field }) => (
              <MultiSelect
                size="sm"
                options={referenceDoctorOptions}
                onSelect={(vals) => field.onChange(vals)}
              />
            )}
          />
        </div>

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
