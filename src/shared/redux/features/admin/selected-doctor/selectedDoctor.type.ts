import * as yup from "yup";
export interface DOCTOR_SELECTED_TYPE {
  selected_drs_id: string[];
  ignored_drs_id: string[];
}
export const DOCTOR_SELECTED_SCHEMA = yup.object({
  selected_drs_id: yup.array().of(yup.string()),
  ignored_drs_id: yup.array().of(yup.string()),
});
