interface AGEND_ALL_COMPLETED_DOCTOR {
  _id: string;
  email: string;
  id: string;
}

interface AGEND_ALL_COMPLETED_PATIENT_MODEL {
  _id: string;
  agent_id: string;
  completed_dr: AGEND_ALL_COMPLETED_DOCTOR;
  ignore_dr: string[];
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

export interface AGEND_ALL_COMPLETED_PATIENT_API_RESPONSE {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  data: AGEND_ALL_COMPLETED_PATIENT_MODEL[];
}
export interface AGEND_ALL_COMPLETED_PATIENT_TRANSFORM_MODEL {
  data: AGEND_ALL_COMPLETED_PATIENT_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const AGEND_ALL_COMPLETED_PATIENT_TRANSFORM_RESPONSE = (
  response: AGEND_ALL_COMPLETED_PATIENT_API_RESPONSE
): AGEND_ALL_COMPLETED_PATIENT_TRANSFORM_MODEL => {
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
