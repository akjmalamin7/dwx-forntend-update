interface ADMIN_USER_MODEL {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  role: string;
  image: string[] | undefined;
  id: string;
}

export interface ADMIN_USER_LIST_API_RESPONSE {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_USER_MODEL[];
}

export interface ADMIN_USER_LIST_TRANSFORM_MODEL {
  data: ADMIN_USER_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const ADMIN_USER_LIST_TRANSFORM_RESPONSE = (
  response: ADMIN_USER_LIST_API_RESPONSE
): ADMIN_USER_LIST_TRANSFORM_MODEL => {
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

// export interface AdminUser {
//   id: string;
//   name: string;
//   email: string;
//   mobile: string;
//   password: string;
//   role: "xray_dr" | "doctor" | "agent" | "admin" | "ecg_dr";
//   status: "active" | "inactive";
//   address: string;
//   single: number;
//   double: number;
//   multiple: number;
//   ecg: number;
//   is_default: "Yes" | "No";
//   hide_bill: "Yes" | "No";
//   selected_dr: string[];
//   ignored_dr: string[];
//   soft_delete: "Yes" | "No";
//   image: string | null;
//   createdAt: string;
//   updatedAt: string;
// }
// export interface AdminUserResponse {
//   message: string;
//   success: boolean;
//   data: AdminUser[];
// }
