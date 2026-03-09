import * as yup from "yup";

export const ADMIN_UPDATE_PATIENT_SCHEMA = yup.object({ 
  attachment: yup.array().of(yup.string().url()).required().min(1),
  small_url: yup.array().of(yup.string().url()).required().min(1),
  history: yup.string().optional().default(""),
  xray_name: yup.string().optional().default(""),
  age: yup.string().optional().default(""),
  patient_id: yup.string().required("Patient ID is required"),
  name: yup.string().required("Patient name is required"),
  rtype: yup.string().required("Report type is required"),
  study_for: yup.string().required("Study for is required"),
});
