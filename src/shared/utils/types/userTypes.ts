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

export const ADD_ADMIN_USER_SCHEMA = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  mobile: yup
    .string()
    .required("Mobile number is required")

    .matches(
      /^01[0-9]{9}$/,
      "Enter a valid Bangladesh mobile number (11 digits)"
    ),
  address: yup.string().required("Address is required"),
  single: yup
    .number()
    .typeError("Single must be a number")
    .required("Single price is required")
    .min(0, "Single price cannot be negative"),
  double: yup
    .number()
    .typeError("Double must be a number")
    .required("Double price is required")
    .min(0, "Double price cannot be negative"),
  multiple: yup
    .number()
    .typeError("Multiple must be a number")
    .required("Multiple price is required")
    .min(0, "Multiple price cannot be negative"),
  ecg: yup
    .number()
    .typeError("ECG must be a number")
    .required("ECG price is required")
    .min(0, "ECG price cannot be negative"),
  is_default: yup
    .string()
    .required("is_default is required")
    .oneOf(["Yes", "No"], "is_default must be 'Yes' or 'No'"),
  hide_bill: yup
    .string()
    .required("hide_bill is required")
    .oneOf(["Yes", "No"], "hide_bill must be 'Yes' or 'No'"),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(
      ["xray_dr", "doctor", "agent", "admin"],
      "Role must be one of: xray_dr, doctor, agent, admin"
    ),
  status: yup.string().oneOf(["active", "inactive"]),
  image: yup.string().nullable().notRequired(),
  selected_dr: yup
    .array()
    .of(yup.string())
    .required("selected_dr is required")
    .default([]),
  ignored_dr: yup
    .array()
    .of(yup.string())
    .required("ignored_dr is required")
    .default([]),
});

export type XRayDoctorPayload = yup.InferType<typeof ADD_ADMIN_USER_SCHEMA>;
