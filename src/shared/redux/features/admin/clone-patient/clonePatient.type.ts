import * as yup from "yup";

export const CLONE_PATIENT_SCHEMA = yup.object({
  // attachment: yup
  //   .array()
  //   .of(yup.string().required("Each attachment ID is required"))
  //   .min(1, "At least one attachment is required")
  //   .required("Attachments are required"),
  attachment: yup.array().of(yup.string().url()).required().min(1),
  small_url: yup.array().of(yup.string().url()).required().min(1),

  patient_id: yup.string().required("Patient ID is required"),
  name: yup.string().required("Patient name is required"),
  age: yup.string().optional().default(""),
  gender: yup.string().optional().default(""),
  history: yup.string().optional().default(""),
  xray_name: yup.string().optional().default(""),
  ref_doctor: yup.string().optional().default(""),
  image_type: yup.string().required("Image type is required"), 
});
