export interface ONLINE_PAYMENT_REQUEST {
  total_amount: string;
  month: string;
  bill_id?: string;
  user_id?: string;
  cus_name?: string;
  cus_email?: string;
  cus_phone?: string;
  cus_add1?: string;
  product_name?: string;
}

export interface ONLINE_PAYMENT_DATA {
  url: string;
  tran_id: string;
}

export interface ONLINE_PAYMENT_RESPONSE {
  message: string;
  success: boolean;
  data: ONLINE_PAYMENT_DATA;
}

