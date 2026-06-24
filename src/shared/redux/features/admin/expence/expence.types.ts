// ====================== Category ======================

export interface ADMIN_EXPENSE_CATEGORY_MODEL {
  _id: string;
  name: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ADMIN_EXPENSE_CATEGORY_LIST_API_RESPONSE_MODEL {
  success: boolean;
  data: ADMIN_EXPENSE_CATEGORY_MODEL[];
}

// component-friendly flat option
export interface ExpenseCategoryOption {
  id: string;
  name: string;
}

export interface ADMIN_EXPENSE_CATEGORY_CREATE_PAYLOAD {
  name: string;
}

export interface ADMIN_EXPENSE_CATEGORY_MUTATION_RESPONSE_MODEL {
  success: boolean;
  message: string;
  data: ADMIN_EXPENSE_CATEGORY_MODEL;
}

// ====================== Expense ======================

export interface ADMIN_EXPENSE_MODEL {
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
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ADMIN_EXPENSE_LIST_API_RESPONSE_MODEL {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: ADMIN_EXPENSE_MODEL[];
}

export interface ADMIN_TRANSFORM_EXPENSE_LIST_MODEL {
  data: ADMIN_EXPENSE_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const ADMIN_TRANSFORM_EXPENSE_LIST_RESPONSE = (
  response: ADMIN_EXPENSE_LIST_API_RESPONSE_MODEL
): ADMIN_TRANSFORM_EXPENSE_LIST_MODEL => {
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

// Create / Update payload — category_id is a plain string when sending
export interface ADMIN_EXPENSE_CREATE_PAYLOAD {
  category_id: string;
  title: string;
  amount: number;
  month: string;
  note?: string;
  date?: string;
}

export interface ADMIN_EXPENSE_UPDATE_PAYLOAD extends ADMIN_EXPENSE_CREATE_PAYLOAD {
  id: string;
}

export interface ADMIN_EXPENSE_MUTATION_RESPONSE_MODEL {
  success: boolean;
  message: string;
  data: ADMIN_EXPENSE_MODEL;
}

export interface ADMIN_EXPENSE_DELETE_RESPONSE_MODEL {
  success: boolean;
  message: string;
}

// ====================== Summary ======================

export interface ADMIN_EXPENSE_SUMMARY_CATEGORY_MODEL {
  total: number;
  count: number;
  category_id: string;
  category_name: string;
}

export interface ADMIN_EXPENSE_SUMMARY_API_RESPONSE_MODEL {
  success: boolean;
  month: string;
  grandTotal: number;
  data: ADMIN_EXPENSE_SUMMARY_CATEGORY_MODEL[];
}