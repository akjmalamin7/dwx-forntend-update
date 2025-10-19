export interface ADMIN_FORMAT_LIST_TYPE {
  _id: string;
  user_id: string;
  title: string;
  details?: string;
  type?: string;
  createdAt: string;
  updatedAt?: string;
  __v: number;
}

export interface ADMIN_FORMAT_LIST_RESPONSE {
  message: string;
  success: boolean;
  data: ADMIN_FORMAT_LIST_TYPE[];
}
