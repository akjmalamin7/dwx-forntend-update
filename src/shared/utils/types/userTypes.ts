import * as yup from "yup";

export const RoleEnum = {
  admin: "admin",
  user: "user",
  xray_dr: "xray_dr",
  ecg_dr: "ecg_dr",
} as const;

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum];

export const StatusEnum = {
  active: "active",
  inactive: "inactive",
} as const;

export type StatusEnum = (typeof StatusEnum)[keyof typeof StatusEnum];

export const YesNoEnum = {
  Yes: "Yes",
  No: "No",
} as const;

export type YesNoEnum = (typeof YesNoEnum)[keyof typeof YesNoEnum];

export interface UserFormValues {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: RoleEnum;
  status: StatusEnum;
  address: string;

  single: number;
  double: number;
  multiple: number;
  ecg: number;

  is_default: YesNoEnum;
  hide_bill: YesNoEnum;
  soft_delete: YesNoEnum;

  selected_dr: string[];
  ignored_dr: string[];

  image: string[] | null;
}

export const userFormSchema: yup.ObjectSchema<UserFormValues> = yup.object({
  name: yup.string().required("Please provide a name").trim(),
  email: yup.string().required("Please provide an email or username").trim(),
  mobile: yup.string().required("Please provide a mobile number"),
  password: yup.string().required("Please provide a password"),

  role: yup
    .mixed<RoleEnum>()
    .oneOf(["admin", "xray_dr", "ecg_dr", "user"])
    .default("user"),
  status: yup
    .mixed<StatusEnum>()
    .oneOf(["active", "inactive"])
    .default("active"),

  address: yup.string().required("Please provide an address"),

  single: yup.number().required("Please provide a single price"),
  double: yup.number().required("Please provide a double price"),
  multiple: yup.number().required("Please provide a multiple price"),
  ecg: yup.number().required("Please provide an ecg price"),

  is_default: yup.mixed<YesNoEnum>().oneOf(["Yes", "No"]).default("No"),
  hide_bill: yup.mixed<YesNoEnum>().oneOf(["Yes", "No"]).default("No"),
  soft_delete: yup.mixed<YesNoEnum>().oneOf(["Yes", "No"]).default("No"),

  selected_dr: yup.array().of(yup.string()).default([]),
  ignored_dr: yup.array().of(yup.string()).default([]),

  image: yup.array().of(yup.string().url()).nullable().default(null),
}) as yup.ObjectSchema<UserFormValues>;
