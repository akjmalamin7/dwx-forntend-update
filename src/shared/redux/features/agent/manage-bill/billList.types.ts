export interface BILL_TRANSFORM_MODEL { 
  _id: string;
  id: string;
  user_id: string;
  month: string; 
  createdAt: string;
  honorarium: string;
  honorarium_to: string;
  net_amount: string;
  paid_amount: string;
  payment_date: string;
  received_number: string;
  status: string;
  total_amount: string;
  total_double: string;
  total_ecg: string;
  total_multiple: string;
  total_patients: string;
  total_single: string;
  trans_id: string;
  updatedAt: string;
}

export interface BillListApiResponse {
  message: string;
  success: boolean;
  total: number;
  data: BILL_TRANSFORM_MODEL[];
}

export const transformBillListResponse = (
  data: BILL_TRANSFORM_MODEL[]
): BILL_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    id: item.id, 
    month: item.month,
    total_patients: item.total_patients,
    total_single: item.total_single,
    total_double: item.total_double,
    total_multiple: item.total_multiple,
    total_ecg: item.total_ecg,
    total_amount: item.total_amount,
    status: item.status,  
  }));
};
