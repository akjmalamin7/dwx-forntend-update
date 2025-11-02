import * as yup from "yup";

export interface FormatFormValues {
  title: string;
  details: string; 
  type: string;
}

export const FormatFormschema: yup.ObjectSchema<FormatFormValues> =
  yup.object({ 
    title: yup.string().required("Format Title is required"),
    type: yup.string().required("Type is required"),
    details: yup.string().required("Details is required"),
  }) as yup.ObjectSchema<FormatFormValues>;
