interface ADMIN_DOCTOR_LIST_MODEL {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: string;
  mobile: string;
  address: string;
  image: string[][];
}

export interface ADMIN_DOCTOR_LIST_API_RESPONSE_MODEL {
  message: string;
  success: boolean;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_DOCTOR_LIST_MODEL[];
}

export interface ADMIN_TRANSFORM_DOCTOR_LIST_MODEL {
  data: ADMIN_DOCTOR_LIST_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const ADMIN_TRANSFORM_DOCTOR_LIST_RESPONSE = (
  response: ADMIN_DOCTOR_LIST_API_RESPONSE_MODEL
): ADMIN_TRANSFORM_DOCTOR_LIST_MODEL => {
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
