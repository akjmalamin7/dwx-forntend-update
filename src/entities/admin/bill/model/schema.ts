interface ADMIN_AGENT_MODEL {
  _id: string;
  email: string;
  id: string;
}

interface ADMIN_CUSTOMER_UPDATE_BILL_DOCTOR_MODEL {
  _id: string;
  id: string;
  agent_id: ADMIN_AGENT_MODEL;
  image_type: "single" | "double" | "multiple" | "ecg" | string;
  month_year: string;
  xray_name: string;
}

export interface ADMIN_CUSTOMER_BILL_DOCTOR_API_RESPONSE {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_CUSTOMER_UPDATE_BILL_DOCTOR_MODEL[];
}

export interface ADMIN_CUSTOMER_BILL_DOCTOR_TRANSFORM_MODEL {
  data: ADMIN_CUSTOMER_UPDATE_BILL_DOCTOR_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const ADMIN_CUSTOMER_BILL_DOCTOR_TRANSFORM_RESPONSE = (
  response: ADMIN_CUSTOMER_BILL_DOCTOR_API_RESPONSE
): ADMIN_CUSTOMER_BILL_DOCTOR_TRANSFORM_MODEL => {
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

// customer bill request
interface ADMIN_BILL_USER {
  _id: string;
  email: string;
  id: string;
  single?: number;
  double?: number;
  multiple?: number;
  ecg?: number;
}
export interface ADMIN_CUSTOMER_BILL_REQUEST_MODEL {
  _id: string;
  id: string;
  month: string;
  user_id: ADMIN_BILL_USER;
  total_patients: number;
  total_single: number;
  total_double: number;
  total_multiple: number;
  total_ecg: number;
  total_amount: number;
  paid_amount: number;
  honorarium: number | null;
  honorarium_to: string | null;
  net_amount: number | null;
  payment_date: string | null;
  received_number: string | null;
  trans_id: string | null;
  status: string;
  hasPendingHistory?: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface ADMIN_CUSTOMER_BILL_REQUEST_API_RESPONSE {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  data: ADMIN_CUSTOMER_BILL_REQUEST_MODEL[];
}

export interface ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_MODEL {
  data: ADMIN_CUSTOMER_BILL_REQUEST_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_RESPONSE = (
  response: ADMIN_CUSTOMER_BILL_REQUEST_API_RESPONSE
): ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_MODEL => {
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

// admin bill history api
interface ADMIN_BILL_MODEL {
  _id: string;
  id: string;
  month: string;
  user_id: string;
  total_patients: number;
  total_single: number;
  total_double: number;
  total_multiple: number;
  total_ecg: number;
  total_amount: number;
  paid_amount: number | null;
  honorarium: number | null;
  honorarium_to: string | null;
  net_amount: number | null;
  payment_date: string | null;
  received_number: string | null;
  trans_id: string | null;
  status: string;
  hasPendingHistory?: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ADMIN_BILL_API_RESPONSE {
  success: boolean;
  message: string;
  data: ADMIN_BILL_MODEL[];
}
