export interface XraytypeListOPtions {
  id: string;
  name: string;
}
export interface XraytypeListOptionsTypes {
  _id: string;
  id: string;
  user_id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export interface XraytypeListResponse {
  status: string;
  data: XraytypeListOptionsTypes[];
}
