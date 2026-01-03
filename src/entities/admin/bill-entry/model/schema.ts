import * as yup from "yup";
export const BILL_ENTRY_SCHEMA = yup.object({
  user_id: yup.string().required("Patient ID is required"),
  month: yup.string().required("Patient month is required"),
  total_single: yup.number().required("Patient total_single is required"),
  total_double: yup.number().required("Patient total_double is required"),
  total_multiple: yup.number().required("Patient total_multiple is required"),
  total_ecg: yup.number().required("Patient total_ecg is required"),
});
export type BILL_ENTRY_TYPE = yup.InferType<typeof BILL_ENTRY_SCHEMA>;
