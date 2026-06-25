export type CashLedgerType =
  | "opening_balance"
  | "income"
  | "expense"
  | "loan_given"
  | "loan_repaid"
  | "manual_deposit"
  | "manual_withdraw";

export interface ADMIN_CASH_LEDGER_MODEL {
  _id: string;
  type: CashLedgerType;
  amount: number;
  note: string;
  reference_id: string | null;
  date: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Opening Balance ----------

export interface ADMIN_OPENING_BALANCE_PAYLOAD {
  amount: number;
  note?: string;
}

export interface ADMIN_OPENING_BALANCE_RESPONSE_MODEL {
  success: boolean;
  message: string;
  data: ADMIN_CASH_LEDGER_MODEL;
}

export interface ADMIN_GET_OPENING_BALANCE_RESPONSE_MODEL {
  success: boolean;
  data: ADMIN_CASH_LEDGER_MODEL | null;
}

// ---------- Manual Entry ----------

export interface ADMIN_MANUAL_ENTRY_CREATE_PAYLOAD {
  type: "manual_deposit" | "manual_withdraw";
  amount: number;
  note?: string;
}

export interface ADMIN_MANUAL_ENTRY_UPDATE_PAYLOAD {
  id: string;
  type?: "manual_deposit" | "manual_withdraw";
  amount?: number;
  note?: string;
}

export interface ADMIN_MANUAL_ENTRY_RESPONSE_MODEL {
  success: boolean;
  message: string;
  data: ADMIN_CASH_LEDGER_MODEL;
}

export interface ADMIN_MANUAL_ENTRY_DELETE_RESPONSE_MODEL {
  success: boolean;
  message: string;
}

// ---------- Balance ----------

export interface ADMIN_CASH_BALANCE_BREAKDOWN {
  opening_balance: number;
  total_income: number;
  total_expense: number;
  total_loan_given: number;
  total_loan_repaid: number;
  total_manual_deposit: number;
  total_manual_withdraw: number;
}

export interface ADMIN_CASH_BALANCE_MODEL {
  current_balance: number;
  breakdown: ADMIN_CASH_BALANCE_BREAKDOWN;
}

export interface ADMIN_CASH_BALANCE_RESPONSE_MODEL {
  success: boolean;
  data: ADMIN_CASH_BALANCE_MODEL;
}

// ---------- History ----------

export interface ADMIN_CASH_LEDGER_HISTORY_API_RESPONSE_MODEL {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: ADMIN_CASH_LEDGER_MODEL[];
}

export interface ADMIN_TRANSFORM_CASH_LEDGER_HISTORY_MODEL {
  data: ADMIN_CASH_LEDGER_MODEL[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const ADMIN_TRANSFORM_CASH_LEDGER_HISTORY_RESPONSE = (
  response: ADMIN_CASH_LEDGER_HISTORY_API_RESPONSE_MODEL
): ADMIN_TRANSFORM_CASH_LEDGER_HISTORY_MODEL => {
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