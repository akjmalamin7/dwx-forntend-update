import * as yup from "yup";

export interface XrayTypeFormValues {
  name: string;
}

export const XrayTypeFormschema: yup.ObjectSchema<XrayTypeFormValues> =
  yup.object({ 
    name: yup.string().required("Xray type name is required")
  }) as yup.ObjectSchema<XrayTypeFormValues>;
