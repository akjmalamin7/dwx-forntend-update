import * as yup from "yup";
export type ErrorType = {
  status: boolean;
  message: string;
};

export type OptionsType = {
  value: string;
  name: string;
};

export interface PatientFormValues {
  attachment: string[];
  rtype: string;
  study_for: string;
  selected_drs_id: string[];
  ignored_drs_id: string[];
  patient_id: string;
  name: string;
  age: string;
  history: string;
  gender: "male" | "female";
  xray_name: string;
  ref_doctor: string;
  image_type: "multiple" | "double" | "single";
}

export const patientFormschema: yup.ObjectSchema<PatientFormValues> =
  yup.object({
    attachment: yup.array().of(yup.string().url()),

    rtype: yup.string().default(""),
    study_for: yup.string().default(""),

    selected_drs_id: yup.array().of(yup.string()).default([]),
    ignored_drs_id: yup.array().of(yup.string()).default([]),

    patient_id: yup.string().required("Patient ID is required"),
    name: yup.string().required("Patient name is required"),
    age: yup.string().required("Patient age is required"),
    history: yup.string().required("Patient history is required"),
    gender: yup.mixed<"male" | "female">().oneOf(["male", "female"]).required(),
    xray_name: yup.string().required("X-ray name is required"),
    ref_doctor: yup.string().required("Reference doctor is required"),
    image_type: yup
      .mixed<"single" | "double" | "multiple">()
      .oneOf(["single", "double", "multiple"])
      .required(),
  }) as yup.ObjectSchema<PatientFormValues>;
