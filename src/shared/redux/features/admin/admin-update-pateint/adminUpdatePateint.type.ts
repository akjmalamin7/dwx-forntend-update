import * as yup from "yup";

export const ADMIN_UPDATE_PATIENT_SCHEMA = yup.object({
  attachment: yup
    .array()
    .of(yup.string().required("Each attachment ID is required"))
    .min(1, "At least one attachment is required")
    .required("Attachments are required"),
  history: yup.string().required("Patient history is required"),
  xray_name: yup.string().required("X-ray name is required"),
  name: yup.string().required("Patient name is required"),
  rtype: yup.string().required("Report type is required"),
});
