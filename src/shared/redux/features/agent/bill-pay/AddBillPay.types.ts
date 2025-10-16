import * as yup from "yup";

export interface BillPayFormValues {
  total_bill: string;
  month: string;
  trans_id: string;
  received_number: string;
}

export const BillPayFormschema: yup.ObjectSchema<BillPayFormValues> =
  yup.object({ 
    total_bill: yup.string().required("Total Amount is required"),
    month: yup.string().required("Bill Month is required"),
    trans_id: yup.string().required("Transaction ID is required"),
    received_number: yup.string().required("Received number is required"),
  }) as yup.ObjectSchema<BillPayFormValues>;
