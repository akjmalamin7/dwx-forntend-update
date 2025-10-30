import * as yup from "yup";

export interface ADD_NEW_IMAGE_TYPE {
  _id: string;
  attachment: string[];
}

export const ADD_NEW_IMAGE_SCHEMA = yup.object({
  _id: yup.string().required("ID is required"),
  attachment: yup
    .array()
    .of(yup.string().url("Each attachment must be a valid URL"))
    .min(1, "At least one attachment is required")
    .required("Attachments are required"),
});
