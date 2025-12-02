import * as yup from "yup";
interface ADMIN_ALL_FORMATES {
  _id: string;
  id: string;
  user_id: string;
  title: string;
  details: string;
  type: "AdminFormat" | "DoctorFormat";
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export interface ADMIN_ALL_FORMATES_API_RESPONSE {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_ALL_FORMATES[];
}
export interface ADMIN_ALL_FORMATES_TRANSFORM_MODEL {
  data: ADMIN_ALL_FORMATES[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const ADMIN_ALL_FORMATES_TRANSFORM_RESPONSE = (
  response: ADMIN_ALL_FORMATES_API_RESPONSE
): ADMIN_ALL_FORMATES_TRANSFORM_MODEL => {
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

export interface ADMIN_FORMATE_VIEW_TYPE {
  _id: string;
  user_id: string;
  title: string;
  details: string;
  type: "AdminFormat";
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export interface ADMIN_FORMATE_VIEW_RESPOONSE {
  message: string;
  success: boolean;
  data: ADMIN_FORMATE_VIEW_TYPE;
}
// =======================form=======================
export interface ADMIN_FORMATE_FORM_VALUES {
  title: string;
  details: string;
  type: string;
}

export const ADMIN_FORAMTE_SCHEMA: yup.ObjectSchema<ADMIN_FORMATE_FORM_VALUES> =
  yup.object({
    title: yup.string().required("Format Title is required"),
    type: yup.string().required("Type is required"),
    details: yup.string().required("Details is required"),
  }) as yup.ObjectSchema<ADMIN_FORMATE_FORM_VALUES>;
