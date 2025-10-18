export interface TRANSECTION_SUMMARY_MODEL {
  _id: string;
  id: string;
  month: string;
  total_patients: string;
  total_single: string;
  total_double: string;
  total_multiple: string;
  total_ecg: string;
  total_amount: string;
  status: string;
}



export interface TRANSECTION_TRANSFORM_MODEL { 
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
 
export interface TransectionListApiResponse {
  message: string;
  success: boolean;
  total: number;
  bills: TRANSECTION_SUMMARY_MODEL[];
}

  
export const transformTransectionListResponse = (
  data: TRANSECTION_SUMMARY_MODEL[]
): TRANSECTION_SUMMARY_MODEL[] => {
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