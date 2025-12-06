import * as yup from "yup";
export interface DOCTOR_SELECTED_TYPE {
  doctor_id: string[];
  ignore_dr: string[];
}
export const DOCTOR_SELECTED_SCHEMA = yup.object({
  doctor_id: yup.array().of(yup.string()),
  ignore_dr: yup.array().of(yup.string()),
});
