import * as yup from "yup";

export interface ReferenceFormValues {
  name: string;
}

export const ReferenceFormschema: yup.ObjectSchema<ReferenceFormValues> =
  yup.object({ 
    name: yup.string().required("Reference name is required")
  }) as yup.ObjectSchema<ReferenceFormValues>;
