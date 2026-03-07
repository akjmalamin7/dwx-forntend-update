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
  total_bill: number;
  month: string;
  trans_id?: string;        
  received_number?: string;  
  user_id: BILL_USER;
  honorarium?: string;      
  honorarium_to?: string;  
  paid_amount?: string;    
  status: string;
}

export const ADD_CUSTOMER_BILL_PAY_SCHEMA = yup.object({
  total_bill: yup.number().required("Total Amount is required"),
  month: yup.string().required("Bill Month is required"),
  trans_id: yup.string().optional().default(""),
  received_number: yup.string().optional().default(""),
  status: yup.string().required("Status is required"),
  honorarium: yup.string().optional().default(""),
  honorarium_to: yup.string().optional().default(""),
  paid_amount: yup.string().optional().default(""),
});
