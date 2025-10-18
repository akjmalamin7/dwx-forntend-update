export interface CheckedUserListOptions {
  id: string;
  name: string;
  details: string;
}
export interface CheckedUserListOptionsTypes {
  _id: string;
  id: string;
  user_id: string;
  name: string;
  details: string; 
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export interface CheckedUserListResponse {
  status: string;
  data: CheckedUserListOptionsTypes[];
}
