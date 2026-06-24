import * as yup from "yup";
export type ErrorType = {
  status: boolean;
  message: string;
};

export type OptionsType = {
  value: string;
  name: string;
};

export interface PatientFormValues {
  attachment: string[];
  small_url: string[];
  rtype: string;
  study_for: string;
  doctor_id: string[];
  ignore_dr: string[];
  patient_id: string;
  name: string;
  age: string;
  history: string;
  gender: "male" | "female";
  xray_name: string;
  ref_doctor: string;
  image_type: "multiple" | "double" | "single" | 'ecg';
}

export const patientFormschema: yup.ObjectSchema<PatientFormValues> =
  yup.object({
    attachment: yup.array().of(yup.string().url()).required().min(1),
    small_url: yup.array().of(yup.string().url()).required().min(1),

    rtype: yup.string().default(""),
    study_for: yup.string().default(""),

    doctor_id: yup.array().of(yup.string()).default([]),
    ignore_dr: yup.array().of(yup.string()).default([]),

    patient_id: yup.string().required("Patient ID is required"),
    name: yup.string().required("Patient name is required"),
    age: yup.string().optional().default(""),
    history: yup.string().required("Patient history is required"),
    gender: yup.mixed<"male" | "female">().oneOf(["male", "female"]).required(),
    xray_name: yup.string().required("X-ray name is required"),
    ref_doctor: yup.string().required("Reference doctor is required"),
    image_type: yup
      .mixed<"single" | "double" | "multiple" | "ecg">()
      .oneOf(["single", "double", "multiple", "ecg"])
      .required(),
  }) as yup.ObjectSchema<PatientFormValues>;

//menu
export const RoleEnum = {
  admin: "admin",
  user: "user",
  xray_dr: "xray_dr",
  ecg_dr: "ecg_dr",
} as const;
export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum];
interface MenuDropDown {
  id: string;
  title?: string;
  path?: string;
  role: RoleEnum[];
  icon?: string;
}

export interface MenuType {
  id: string;
  title?: string;
  path?: string;
  icon?: React.ReactNode;
  role: RoleEnum[];
  children?: MenuDropDown[];
}



export const expenseFormSchema = yup.object({
  category_id: yup.string().required("Category is required"),
  title: yup.string().required("Title is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  month: yup.string().required("Month is required"),
  note: yup.string().optional().default(""),
  date: yup.string().optional().default(""),
});

export type ExpenseFormValues = yup.InferType<typeof expenseFormSchema>;


export const loanFormSchema = yup.object({
  employee_id: yup.string().required("Employee is required"),
  total_loan: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Loan amount is required"),
  note: yup.string().optional().default(""),
});

export type LoanFormValues = yup.InferType<typeof loanFormSchema>;

export const repayFormSchema = yup.object({
  loan_id: yup.string().required("Loan is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Repay amount is required"),
  note: yup.string().optional().default(""),
});

export type RepayFormValues = yup.InferType<typeof repayFormSchema>;