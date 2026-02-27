import * as yup from "yup";

export interface SettingsFormValues {
  doctor_msg: string;
  customer_msg: string;
  mobile_1: string;
  mobile_2: string;
  mobile_3: string;
  mobile_4: string;
  skype: string;
  anydesk: string;
  email: string;
  address: string;
  logo?: string;
  is_print: number;
  bill_is_print: number;
  pusher_time?: number;
  patient_info?: string;
  admin_pending_refresh?: number;
  admin_complete_refresh?: number;
}

export const SettingsFormSchema: yup.ObjectSchema<SettingsFormValues> = yup.object({
  doctor_msg: yup.string().required("Doctor message is required"),
  customer_msg: yup.string().required("Customer message is required"),
  mobile_1: yup.string().required("Mobile 1 is required"),
  mobile_2: yup.string().default(""),
  mobile_3: yup.string().default(""),
  mobile_4: yup.string().default(""),
  skype: yup.string().default(""),
  anydesk: yup.string().default(""),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  logo: yup.string().optional(),
  is_print: yup.number().default(1),
  bill_is_print: yup.number().default(1),
  pusher_time: yup.number().optional(),
  patient_info: yup.string().optional(),
  admin_pending_refresh: yup.number().optional(),
  admin_complete_refresh: yup.number().optional(),
}) as yup.ObjectSchema<SettingsFormValues>;