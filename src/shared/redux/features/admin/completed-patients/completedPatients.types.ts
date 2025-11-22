interface ADMIN_AGENT_DOCTOR {
  _id: string;
  email: string;
  id: string;
}

interface ADMIN_COMPLETED_PATIENTS_MODEL {
  _id: string;
  agent_id: ADMIN_AGENT_DOCTOR;
  doctor_id: ADMIN_AGENT_DOCTOR[];
  completed_dr: ADMIN_AGENT_DOCTOR;
  ignore_dr: ADMIN_AGENT_DOCTOR[];
  patient_id: string;
  name: string;
  age: string;
  gender: string;
  history: string;
  ref_doctor: string;
  image_type: string;
  xray_name: string;
  rtype: string;
  status: string;
  soft_delete: string;
  month_year: string;
  completed_time: string;
  is_checked: boolean | null;
  logged: string | null;
  printstatus: string | null;
  study_for: string;
  viewed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
interface COMMENTS {
  _id: string;
  patient_id: string;
  doctor_id: string;
  passault: string;
  comments: string;
  image_type: string;
  month: string;
  xray_name: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
interface REVISIONS {
  _id: string;
  patient_id: string;
  doctor_id: ADMIN_AGENT_DOCTOR;
  passault: string;
  comments: string;
  image_type: string;
  month: string;
  xray_name: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ADMIN_COMPLETED_PATIENTS_API_RRSPONSE {
  message: string;
  success: boolean;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_COMPLETED_PATIENTS_MODEL[];
}
export interface ADMIN_COMPLETED_PATIENTS_TRANSFORM_MODEL {
  data: ADMIN_COMPLETED_PATIENTS_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const ADMIN_COMPLETED_PATIENTS_TRANSFORM_RESPONSE = (
  response: ADMIN_COMPLETED_PATIENTS_API_RRSPONSE
): ADMIN_COMPLETED_PATIENTS_TRANSFORM_MODEL => {
  return {
    data: response.data,
    pagination: {
      currentPage: response.page,
      totalPages: response.totalPages,
      limit: response.limit,
      hasNext: response.page < response.totalPages,
      hasPrev: response.page > 1,
    },
  };
};

// get single patient
interface ADMIN_AGENT_DOCTOR_SINGLE_DOCTOR {
  _id: string;
  email: string;
  name: string;
  id: string;
}
interface ADMIN_COMPLETED_PATIENT_MODEL {
  _id: string;
  agent_id: ADMIN_AGENT_DOCTOR_SINGLE_DOCTOR;
  doctor_id: ADMIN_AGENT_DOCTOR_SINGLE_DOCTOR;
  completed_dr: ADMIN_AGENT_DOCTOR_SINGLE_DOCTOR;
  patient_id: string;
  name: string;
  age: string;
  gender: string;

  history: string;
  ref_doctor: string;

  image_type: string;
  xray_name: string;
  rtype: string;
  status: string;
  soft_delete: string;
  month_year: string;
  completed_time: string;
  is_checked: boolean | null;
  logged: string | null;
  printstatus: string | null;
  study_for: string;
  viewed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;

  // new nested fields for this endpoint
  attachments?: string[][];
  comments: COMMENTS | null;
  revisions: REVISIONS[];
}

export interface ADMIN_COMPLETED_PATIENT_API_RESPONSE {
  message: string;
  success: boolean;
  data: ADMIN_COMPLETED_PATIENT_MODEL;
}
