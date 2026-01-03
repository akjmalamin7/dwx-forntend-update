import * as yup from "yup";

export interface HistoryFormValues {
  name: string;
}

export const HistoryFormschema: yup.ObjectSchema<HistoryFormValues> =
  yup.object({ 
    name: yup.string().required("Xray type name is required")
  }) as yup.ObjectSchema<HistoryFormValues>;
