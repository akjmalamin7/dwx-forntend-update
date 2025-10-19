import * as yup from "yup";

export interface REPORT_SUBMISSION_FORMAT_TYPE {
  patient_id: string;
  comments: string;
  passault?: string;
}

export const REPORT_SUBMISSION_FORMAT_SCHEMA = yup.object({
  patient_id: yup.string().required("Patient ID is required"),
  comments: yup.string().required("Doctor comment is required"),
  passault: yup.string().optional(),
});
