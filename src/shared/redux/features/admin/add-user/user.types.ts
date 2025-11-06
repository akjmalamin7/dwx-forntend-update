import * as yup from "yup";
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
  image: yup
    .string()
    .nullable()
    .notRequired()
    .transform((value) => {
      if (Array.isArray(value)) return value[0];
      if (typeof value === "string") {
        return value.replace(/^"|"$/g, "");
      }

      return value;
    }),

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

export const CHANGE_PASSWORD_SCHEMA = yup.object({
  _id: yup.string().default(""),
  password: yup.string().required(),
});
export type CHANGE_PASSWORD_TYPE = yup.InferType<typeof CHANGE_PASSWORD_SCHEMA>;
export interface USER_MODEL {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  role: string;
  id: string;
}

export interface USER_TRANSFORM_MODEL {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  role: string;
  id: string;
}

export interface UserListApiResponse {
  message: string;
  success: boolean;
  total: number;
  data: USER_TRANSFORM_MODEL[];
}

export const transformUserListResponse = (
  data: USER_TRANSFORM_MODEL[]
): USER_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    id: item.id,
    name: item.name,
    email: item.email,
    mobile: item.mobile,
    address: item.address,
    role: item.role,
  }));
};

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: "xray_dr" | "doctor" | "agent" | "admin" | "ecg_dr";
  status: "active" | "inactive";
  address: string;
  single: number;
  double: number;
  multiple: number;
  ecg: number;
  is_default: "Yes" | "No";
  hide_bill: "Yes" | "No";
  selected_dr: string[];
  ignored_dr: string[];
  soft_delete: "Yes" | "No";
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface AdminUserResponse {
  message: string;
  success: boolean;
  data: AdminUser[];
}
