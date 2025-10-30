export interface BILL_USER {
  _id: string;
  single: number;
  double: number;
  multiple: number;
  ecg: number;
  email: string;
  id: string;
}
export interface BILL_MODEL {
  _id: string;
  id: string;
  month: string;
  user_id: BILL_USER;
  total_patients: string;
  total_single: string;
  total_double: string;
  total_multiple: string;
  total_ecg: string;
  total_amount: string;
  status: string;
}
 
export interface BILL_TRANSFORM_MODEL {
  _id: string;
  id: string;
  user_id: BILL_USER;
  month: string;
  total_patients: string;
  total_single: string;
  total_double: string;
  total_ecg: string;
  total_multiple: string;
  status: string;
  total_amount: string;  
}

export interface BILL_RESPONSE {
  message: string;
  success: boolean;
  data: BILL_TRANSFORM_MODEL[];
}
export interface BillListApiResponse {
  message: string;
  success: boolean;
  total: number;
  data: BILL_MODEL[];
}

export const transformBillListResponse = (data: BILL_MODEL[]): BILL_MODEL[] => {
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
    status: item.status,
  }));
};
