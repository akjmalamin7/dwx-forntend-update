import * as yup from "yup";

export interface SoftwareFormValues {
  title: string;
  url: string;
}

export const SoftwareFormschema: yup.ObjectSchema<SoftwareFormValues> =
  yup.object({ 
    title: yup.string().required("Title is required"),
    url: yup.string().required("Xray type name is required")
  }) as yup.ObjectSchema<SoftwareFormValues>;
