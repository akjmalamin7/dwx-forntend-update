interface ADMIN_TODAY_SUMMARY_MODEL {
  _id: string;
  totalCompleted: number;
  userId: string;
  name: string;
  address: string;
  mobile: string;
  email: string;
}

export interface ADMIN_TODAY_SUMMARY_API_RESPONSE {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_TODAY_SUMMARY_MODEL[];
}
export interface ADMIN_TODAY_SUMMARY_TRANSFORM_MODEL {
  data: ADMIN_TODAY_SUMMARY_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const ADMIN_TODAY_SUMMARY_TRANSFORM_RESPONSE = (
  response: ADMIN_TODAY_SUMMARY_API_RESPONSE
): ADMIN_TODAY_SUMMARY_TRANSFORM_MODEL => {
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
