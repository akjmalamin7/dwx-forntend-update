interface ADMIN_UPDATE_BILL {
  _id: string;
  id: string;
  patient_id: string;
  username: string;
  image_type: "single" | "double" | "multiple" | "ecg" | string;
  month: string;
  xray_name: string;
}

export interface ADMIN_UPDATE_BILL_API_RESPONSE {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_UPDATE_BILL[];
}

export interface ADMIN_DOCTOR_UPDATE_BILL_TRANSFORM_MODEL {
  data: ADMIN_UPDATE_BILL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const ADMIN_DOCTOR_UPDATE_BILL_TRANSFORM_RESPONSE = (
  response: ADMIN_UPDATE_BILL_API_RESPONSE
): ADMIN_DOCTOR_UPDATE_BILL_TRANSFORM_MODEL => {
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
