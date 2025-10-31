import * as yup from "yup";

export const CLONE_PATIENT_SCHEMA = yup.object({
  attachment: yup
    .array()
    .of(yup.string().required("Each attachment ID is required"))
    .min(1, "At least one attachment is required")
    .required("Attachments are required"),
  patient_id: yup.string().required("Patient ID is required"),
  name: yup.string().required("Patient name is required"),
  age: yup.string().required("Age is required"),
  gender: yup.string().required("Gender is required"),
  history: yup.string().required("Patient history is required"),
  xray_name: yup.string().required("X-ray name is required"),
  ref_doctor: yup.string().required("Referring doctor is required"),
  image_type: yup.string().required("Image type is required"),
  //   selected_drs_id: yup
  //     .array()
  //     .of(yup.string().required("Doctor ID is required"))
  //     .min(1, "At least one doctor must be selected")
  //     .required("Selected doctors are required"),
  //   ignored_drs_id: yup
  //     .array()
  //     .of(yup.string().required("Doctor ID is required"))
  //     .default([]),
});
