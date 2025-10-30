// billList.types.ts

// User info inside a bill
export interface BILL_USER {
  _id: string;
  email: string;
  id: string;
  single?: number;
  double?: number;
  multiple?: number;
  ecg?: number;
}

// Original bill data from API
export interface BILL_MODEL {
  _id: string;
  id: string;
  month: string;
  user_id: BILL_USER;
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

// Simplified bill model for UI tables, etc.
export interface BILL_TRANSFORM_MODEL {
  _id: string;
  id: string;
  month: string;
  user_id: BILL_USER;
  total_patients: number;
  total_single: number;
  total_double: number;
  total_multiple: number;
  total_ecg: number;
  total_amount: number;
  paid_amount: number;
  status: string;
  trans_id: string | null;
  payment_date: string | null;
  received_number: string | null;
  hasPendingHistory?: boolean;
  createdAt: string;
}

// Full API response shape
export interface BillListApiResponse {
  message: string;
  success: boolean;
  total: number;
  data: BILL_MODEL[];
}

// Transformed API response (optional convenience type)
export interface BILL_RESPONSE {
  message: string;
  success: boolean;
  data: BILL_TRANSFORM_MODEL[];
}

// Transform function
export const transformBillListResponse = (
  data: BILL_MODEL[]
): BILL_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    id: item.id,
    month: item.month,
    user_id: item.user_id,
    total_patients: item.total_patients,
    total_single: item.total_single,
    total_double: item.total_double,
    total_multiple: item.total_multiple,
    total_ecg: item.total_ecg,
    total_amount: item.total_amount,
    paid_amount: item.paid_amount,
    status: item.status,
    trans_id: item.trans_id,
    payment_date: item.payment_date,
    received_number: item.received_number,
    hasPendingHistory: item.hasPendingHistory,
    createdAt: item.createdAt,
  }));
};
