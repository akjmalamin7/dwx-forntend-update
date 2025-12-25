export interface PRINT_DOCTOR_COMMENT {
  _id: string;
  patient_id: string;
  doctor_id: string;
  passault: "Yes" | "No";
  comments: string;
  image_type: string;
  month: string;
  xray_name: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface PRINT_COMPLETED_DOCTOR {
  _id: string;
  name: string;
  email: string;
  address: string;
  image: string[];
  id: string;
}

export interface PRINT_PATIENT {
  _id: string;
  agent_id: string;
  doctor_id: string[];
  ignore_dr: string[];
  patient_id: string;
  name: string;
  age: string;
  gender: "male" | "female" | "other";
  history: string;
  ref_doctor: string;
  image_type: "single" | "multiple";
  xray_name: string;
  rtype: "xray" | string;
  status: "completed" | "pending" | "in-progress";
  soft_delete: "Yes" | "No";
  month_year: string;
  completed_time: string;
  is_checked: boolean | null;
  logged: boolean | null;
  printstatus: "Printed" | "Not Printed" | string;
  study_for: string;
  viewed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  online_dr: string | null;
  completed_dr: PRINT_COMPLETED_DOCTOR;
  doctorcomments: PRINT_DOCTOR_COMMENT[];
  id: string;
}

export interface PRINT_PATIENT_RESPONSE {
  message: string;
  success: boolean;
  data: PRINT_PATIENT;
}
