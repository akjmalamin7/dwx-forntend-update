export interface PaymentListOptions {
  id: string;
  name: string;
  details: string;
}
export interface PaymentListOptionsTypes {
  _id: string;
  id: string;
  user_id: string;
  name: string;
  details: string; 
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export interface PaymentListResponse {
  name: string;
  details: string;
  data: PaymentListOptionsTypes[];
}
 