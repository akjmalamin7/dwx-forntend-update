interface ADMIN_ARCHIVE_DOCTOR {
  _id: string;
  email: string;
  id: string;
}

interface ADMIN_ARCHIVE_DOCTOR_MODEL {
  _id: string;
  agent_id: ADMIN_ARCHIVE_DOCTOR;
  doctor_id: ADMIN_ARCHIVE_DOCTOR[];
  completed_dr: ADMIN_ARCHIVE_DOCTOR;
  ignore_dr: ADMIN_ARCHIVE_DOCTOR[];
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

export interface ADMIN_ARCHIVE_DOCTOR_API_RESPONSE {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_ARCHIVE_DOCTOR_MODEL[];
}

export interface ADMIN_ARCHIVE_DOCTOR_TRANSFORM_MODEL {
  data: ADMIN_ARCHIVE_DOCTOR_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const ADMIN_ARCHIVE_DOCTOR_TRANSFORM_RESPONSE = (
  response: ADMIN_ARCHIVE_DOCTOR_API_RESPONSE
): ADMIN_ARCHIVE_DOCTOR_TRANSFORM_MODEL => {
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
