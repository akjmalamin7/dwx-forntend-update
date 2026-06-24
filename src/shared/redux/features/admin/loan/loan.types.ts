// ====================== Loan: Create / Repay payloads ======================

export interface ADMIN_LOAN_CREATE_PAYLOAD {
  employee_id: string;
  total_loan: number;
  note?: string;
}

export interface ADMIN_LOAN_REPAY_PAYLOAD {
  loan_id: string;
  amount: number;
  note?: string;
}

// ====================== Loan: Employee Summary List (GET /admin/loan) ======================

export interface ADMIN_LOAN_EMPLOYEE_SUMMARY_MODEL {
  total_loan: number;
  total_paid: number;
  total_remaining: number;
  loan_count: number;
  active_count: number;
  closed_count: number;
  last_loan_date: string;
  employee_id: string;
  employee_name: string;
  employee_email: string;
}

export interface ADMIN_LOAN_EMPLOYEE_LIST_API_RESPONSE_MODEL {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: ADMIN_LOAN_EMPLOYEE_SUMMARY_MODEL[];
}

export interface ADMIN_TRANSFORM_LOAN_EMPLOYEE_LIST_MODEL {
  data: ADMIN_LOAN_EMPLOYEE_SUMMARY_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const ADMIN_TRANSFORM_LOAN_EMPLOYEE_LIST_RESPONSE = (
  response: ADMIN_LOAN_EMPLOYEE_LIST_API_RESPONSE_MODEL
): ADMIN_TRANSFORM_LOAN_EMPLOYEE_LIST_MODEL => {
  return {
    data: response.data,
    pagination: {
      currentPage: response.page,
      totalPages: response.totalPages,
      limit: response.limit,
      total: response.total,
      hasNext: response.page < response.totalPages,
      hasPrev: response.page > 1,
    },
  };
};

// ====================== Loan: Detail by Employee (GET /admin/loan/detail/:id) ======================

export interface ADMIN_LOAN_DETAIL_MODEL {
  _id: string;
  employee_id: {
    _id: string;
    name: string;
    email: string;
  };
  total_loan: number;
  paid_amount: number;
  date: string;
  note: string;
  status: "active" | "closed";
  remaining: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ADMIN_LOAN_DETAIL_SUMMARY_MODEL {
  _id: null;
  total_loan: number;
  total_paid: number;
  total_remaining: number;
}

export interface ADMIN_LOAN_DETAIL_API_RESPONSE_MODEL {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  summary: ADMIN_LOAN_DETAIL_SUMMARY_MODEL;
  data: ADMIN_LOAN_DETAIL_MODEL[];
}

export interface ADMIN_TRANSFORM_LOAN_DETAIL_MODEL {
  data: ADMIN_LOAN_DETAIL_MODEL[];
  summary: ADMIN_LOAN_DETAIL_SUMMARY_MODEL;
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const ADMIN_TRANSFORM_LOAN_DETAIL_RESPONSE = (
  response: ADMIN_LOAN_DETAIL_API_RESPONSE_MODEL
): ADMIN_TRANSFORM_LOAN_DETAIL_MODEL => {
  return {
    data: response.data,
    summary: response.summary,
    pagination: {
      currentPage: response.page,
      totalPages: response.totalPages,
      limit: response.limit,
      total: response.total,
      hasNext: response.page < response.totalPages,
      hasPrev: response.page > 1,
    },
  };
};

// ====================== Loan: Repayment History (GET /admin/loan/repay/history/:loan_id) ======================

export interface ADMIN_LOAN_REPAYMENT_MODEL {
  _id: string;
  loan_id: string;
  employee_id: {
    _id: string;
    name: string;
    email: string;
  };
  amount: number;
  date: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ADMIN_LOAN_REPAYMENT_HISTORY_API_RESPONSE_MODEL {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: ADMIN_LOAN_REPAYMENT_MODEL[];
}

export interface ADMIN_TRANSFORM_LOAN_REPAYMENT_HISTORY_MODEL {
  data: ADMIN_LOAN_REPAYMENT_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const ADMIN_TRANSFORM_LOAN_REPAYMENT_HISTORY_RESPONSE = (
  response: ADMIN_LOAN_REPAYMENT_HISTORY_API_RESPONSE_MODEL
): ADMIN_TRANSFORM_LOAN_REPAYMENT_HISTORY_MODEL => {
  return {
    data: response.data,
    pagination: {
      currentPage: response.page,
      totalPages: response.totalPages,
      limit: response.limit,
      total: response.total,
      hasNext: response.page < response.totalPages,
      hasPrev: response.page > 1,
    },
  };
};

// ====================== Mutation responses ======================

export interface ADMIN_LOAN_MUTATION_RESPONSE_MODEL {
  success: boolean;
  message: string;
  data: ADMIN_LOAN_DETAIL_MODEL;
}

export interface ADMIN_LOAN_REPAY_MUTATION_RESPONSE_MODEL {
  success: boolean;
  message: string;
  data: ADMIN_LOAN_REPAYMENT_MODEL;
}