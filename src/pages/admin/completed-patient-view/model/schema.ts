import * as yup from "yup";
export const ADMIN_COMPLETED_REPORT_UDPAT_SCHEMA = yup.object({
  passault: yup.string().oneOf(["Yes", "No"]),
  comments: yup.string().required().default(""),
});
export type ADMIN_COMPLETED_REPORT_UDPAT_SCHEMA_TYPE = yup.InferType<
  typeof ADMIN_COMPLETED_REPORT_UDPAT_SCHEMA
>;
