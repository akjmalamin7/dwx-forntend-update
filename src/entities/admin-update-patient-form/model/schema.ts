import * as yup from "yup";

export const ADMIN_UPDATE_PATIENT_SCHEMA = yup.object({
  // attachment: yup
  //   .array()
  //   .of(yup.string().required("Each attachment ID is required"))
  //   .min(1, "At least one attachment is required")
  //   .required("Attachments are required"),
  attachment: yup.array().of(yup.string().url()).required().min(1),
  small_url: yup.array().of(yup.string().url()).required().min(1),
  history: yup.string().required("Patient history is required"),
  xray_name: yup.string().required("X-ray name is required"),
  age: yup.string().optional().default(""),
  patient_id: yup.string().required("Patient ID is required"),
  name: yup.string().required("Patient name is required"),
  rtype: yup.string().required("Report type is required"),
});
