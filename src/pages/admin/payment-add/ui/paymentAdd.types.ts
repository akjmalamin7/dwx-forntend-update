import * as yup from "yup";

export interface PaymentFormValues {
  name: string;
  details: string;  
}

export const PaymentFormschema: yup.ObjectSchema<PaymentFormValues> =
  yup.object({ 
    name: yup.string().required("Bank Name is required"), 
    details: yup.string().required("Details is required"),
  }) as yup.ObjectSchema<PaymentFormValues>;
