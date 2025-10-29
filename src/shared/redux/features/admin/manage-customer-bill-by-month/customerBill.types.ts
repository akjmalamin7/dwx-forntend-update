 
export interface DOCTOR_BILL_MODEL {
  _id: string;
  id: string;
  user_id: string;
  month: string;
  total_amount: number;
  total_patients: number;
  total_single: number;
  total_double: number;
  total_multiple: number;
  total_ecg: number;
  paid_amount: number | null;
  payment_date: string | null;
  received_number: string | null;
  status: string;
  trans_id: string | null;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface DOCTOR_BILL_TRANSFORM_MODEL {
  _id: string;
  id: string;
  month: string;
  user_id: string;
  total_amount: number;
  total_patients: number;
  status: string;
  paid_amount?: number | null;
  payment_date?: string | null;
  received_number?: string | null;
}

 

export interface DOCTOR_BILL_RESPONSE {
  message: string;
  success: boolean;
  data: DOCTOR_BILL_MODEL[];
}



export const transformDoctorBillResponse = (
  data: DOCTOR_BILL_MODEL[]
): DOCTOR_BILL_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    id: item.id,
    month: item.month,
    user_id: item.user_id,
    total_patients: item.total_patients,
    total_amount: item.total_amount,
    status: item.status,
    paid_amount: item.paid_amount ?? null,
    payment_date: item.payment_date ?? null,
    received_number: item.received_number ?? null,
  }));
};

