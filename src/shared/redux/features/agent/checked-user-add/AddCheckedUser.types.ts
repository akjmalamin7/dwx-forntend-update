import * as yup from "yup";

export interface CheckedUserFormValues {
  name: string;
  details: string;
}

export const CheckedUserFormschema: yup.ObjectSchema<CheckedUserFormValues> =
  yup.object({ 
    name: yup.string().required("User name is required"),
    details: yup.string().required("Designation is required")
  }) as yup.ObjectSchema<CheckedUserFormValues>;
