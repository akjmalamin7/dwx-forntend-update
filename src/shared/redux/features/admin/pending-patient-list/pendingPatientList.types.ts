interface AGENT_DOCTOR {
  _id: string;
  email: string;
  id: string;
}

export interface ADMIN_PENDING_PATIENT_MODEL {
  key?: string;
  _id: string;
  agent_id: AGENT_DOCTOR;
  doctor_id: AGENT_DOCTOR[];
  completed_dr: AGENT_DOCTOR[];
  ignore_dr: AGENT_DOCTOR[];
  online_dr?: AGENT_DOCTOR | null;
  patient_id: string;
  name: string;
  age: string;
  gender: string;
  history: string;
  ref_doctor: string;
  image_type: string;
  image_url?: string;
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
export interface ADMIN_PENDING_PATIENT_API_RESPONSE_MODEL {
  message: string;
  success: boolean;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_PENDING_PATIENT_MODEL[];
}
export interface ADMIN_TRANSFORM_PENDING_PATIENT_MODEL {
  data: ADMIN_PENDING_PATIENT_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const ADMIN_TRANSFORM_PENDING_PATIENT_RESPONSE = (
  response: ADMIN_PENDING_PATIENT_API_RESPONSE_MODEL
): ADMIN_TRANSFORM_PENDING_PATIENT_MODEL => {
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
