import * as yup from "yup";
export interface BILL_USER {
  _id: string;
  single: number;
  double: number;
  multiple: number;
  ecg: number;
  email: string;
  id: string;
}
export interface CustomerBillPayFormValues {
  total_bill: string;
  month: string;
  trans_id: string;
  received_number: string;
  user_id: BILL_USER;
  honorarium: string;
  honorarium_to: string;
}

export const AddCustomerBillPayFormschema =
  yup.object({
    total_bill: yup.number().required("Total Amount is required"),
    month: yup.string().required("Bill Month is required"),
    trans_id: yup.string().required("Transaction ID is required"),
    received_number: yup.string().required("Received number is required"),
  }) 
