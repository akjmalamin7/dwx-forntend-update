interface ADMIN_SOFTWATE_LIST_MODEL {
  _id: string;
  id: string;
  user_id: string;
  title: string;
  url: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export interface ADMIN_SOFTWATE_LIST_API_RESPONSE {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_SOFTWATE_LIST_MODEL[];
}
export interface ADMIN_SOFTWATE_LIST_TRANSFORM_MODEL {
  data: ADMIN_SOFTWATE_LIST_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const ADMIN_SOFTWATE_LIST_TRANSFORM_RESPONSE = (
  response: ADMIN_SOFTWATE_LIST_API_RESPONSE
): ADMIN_SOFTWATE_LIST_TRANSFORM_MODEL => {
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
