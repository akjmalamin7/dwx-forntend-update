// ====================== Category ======================

export interface ADMIN_INCOME_CATEGORY_MODEL {
  _id: string;
  name: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ADMIN_INCOME_CATEGORY_LIST_API_RESPONSE_MODEL {
  success: boolean;
  data: ADMIN_INCOME_CATEGORY_MODEL[];
}

export interface IncomeCategoryOption {
  id: string;
  name: string;
}

export interface ADMIN_INCOME_CATEGORY_CREATE_PAYLOAD {
  name: string;
}

export interface ADMIN_INCOME_CATEGORY_MUTATION_RESPONSE_MODEL {
  success: boolean;
  message: string;
  data: ADMIN_INCOME_CATEGORY_MODEL;
}

// ====================== Income ======================

export interface ADMIN_INCOME_MODEL {
  _id: string;
  category_id: {
    _id: string;
    name: string;
  };
  title: string;
  amount: number;
  month: string;
  note: string;
  date: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ADMIN_INCOME_LIST_API_RESPONSE_MODEL {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: ADMIN_INCOME_MODEL[];
}

export interface ADMIN_TRANSFORM_INCOME_LIST_MODEL {
  data: ADMIN_INCOME_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const ADMIN_TRANSFORM_INCOME_LIST_RESPONSE = (
  response: ADMIN_INCOME_LIST_API_RESPONSE_MODEL
): ADMIN_TRANSFORM_INCOME_LIST_MODEL => {
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

export interface ADMIN_INCOME_CREATE_PAYLOAD {
  category_id: string;
  title: string;
  amount: number;
  month: string;
  note?: string;
  date?: string;
}

export interface ADMIN_INCOME_UPDATE_PAYLOAD extends ADMIN_INCOME_CREATE_PAYLOAD {
  id: string;
}

export interface ADMIN_INCOME_MUTATION_RESPONSE_MODEL {
  success: boolean;
  message: string;
  data: ADMIN_INCOME_MODEL;
}

export interface ADMIN_INCOME_DELETE_RESPONSE_MODEL {
  success: boolean;
  message: string;
}

// ====================== Summary ======================

export interface ADMIN_INCOME_SUMMARY_CATEGORY_MODEL {
  total: number;
  count: number;
  category_id: string;
  category_name: string;
}

export interface ADMIN_INCOME_SUMMARY_API_RESPONSE_MODEL {
  success: boolean;
  month: string;
  grandTotal: number;
  data: ADMIN_INCOME_SUMMARY_CATEGORY_MODEL[];
}

// ====================== Dashboard Financial Summary ======================

 

export interface ADMIN_FINANCIAL_SUMMARY_MODEL {
  total_income: number;
  total_expense: number;
  total_loan_given: number;
  total_loan_repaid: number;
  total_agent_bill: number;
  total_doctor_bill: number;
  liquid_total: number;
}

export interface ADMIN_FINANCIAL_SUMMARY_API_RESPONSE_MODEL {
  success: boolean;
  month: string;
  data: ADMIN_FINANCIAL_SUMMARY_MODEL;
}
