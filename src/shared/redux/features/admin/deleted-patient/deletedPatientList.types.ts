// deletedPatientList.types.ts
interface AGENT_DOCTOR {
  _id: string;
  email: string;
  id: string;
}

interface ADMIN_DELETED_PATIENT_MODEL {
  _id: string;
  agent_id: AGENT_DOCTOR;
  doctor_id: AGENT_DOCTOR[];
  completed_dr: AGENT_DOCTOR;
  ignore_dr: AGENT_DOCTOR[];
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

export interface ADMIN_DELETE_PATIENT_API_RESPONSE_MODEL {
  message: string;
  success: boolean;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_DELETED_PATIENT_MODEL[];
}

export interface ADMIN_TRANSFORMED_DELETE_PATIENT_MODEL {
  data: ADMIN_DELETED_PATIENT_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const ADMIN_TRANSFORMED_DELETE_PATIENT_RESPONSE = (
  response: ADMIN_DELETE_PATIENT_API_RESPONSE_MODEL
): ADMIN_TRANSFORMED_DELETE_PATIENT_MODEL => {
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
