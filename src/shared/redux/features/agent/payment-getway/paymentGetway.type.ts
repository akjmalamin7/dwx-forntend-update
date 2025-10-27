export interface PAYMENT_GETWAY {
  _id: string;
  user_id: string;
  name: string;
  details: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PAYMENT_GETWAY_RESPONSE {
  message: string;
  success: boolean;
  total: number;
  data: PAYMENT_GETWAY[];
}
