import * as yup from "yup";

export const ADMIN_UPDATE_PATIENT_SCHEMA = yup.object({
  attachment: yup
    .array()
    .of(yup.string().url("Each attachment must be a valid URL"))
    .min(1, "At least one attachment is required")
    .required("Attachments are required"),
  study_for: yup.string().default("xray_dr").required(),
  rtype: yup.string().default("xray").required(),
  history: yup.string().required(),
  xray_name: yup.string().required(),
  name: yup.string().required(),
  age: yup.string().required(),
  gender: yup.string().required(),
  ref_doctor: yup.string().required(),
  image_type: yup.string().default("single").required(),
});
