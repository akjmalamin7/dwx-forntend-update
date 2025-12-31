export interface PENDING_DOCTOR {
  _id: string;
  email: string;
  id: string;
}

export interface AGENT_PENDING_PATIENT_MODEL {
  _id: string;
  agent_id: PENDING_DOCTOR;
  completed_dr: PENDING_DOCTOR[];
  doctor_id: PENDING_DOCTOR[];
  ignore_dr: PENDING_DOCTOR[];
  online_dr: PENDING_DOCTOR;
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
  completed_time: string | null;
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

export interface PENDING_PATIENT_TRANSFORM_MODEL {
  _id: string;
  id: string;
  doctor_id: PENDING_DOCTOR[];
  ignore_dr: PENDING_DOCTOR[];
  online_dr: PENDING_DOCTOR;
  createdAt: string;
  patient_id: string;
  name: string;
  gender: string;
  age: string;
  xray_name: string;
  rtype: string;
  printstatus: string | null;
  viewed: boolean;
  is_checked: boolean | null;
}

export interface AGENT_PATIENT_PENDING_API_RESPONSE_MODEL {
  message: string;
  success: boolean;
  page: number;
  limit: number;
  totalPages: number;
  data: AGENT_PENDING_PATIENT_MODEL[];
}
export interface AGENT_TRANSFORM_PENDING_PATIENT_MODEL {
  data: AGENT_PENDING_PATIENT_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const AGENT_TRANSFORM_PENDING_PATIENT_RESPONSE = (
  response: AGENT_PATIENT_PENDING_API_RESPONSE_MODEL
): AGENT_TRANSFORM_PENDING_PATIENT_MODEL => {
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
