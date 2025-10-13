export interface XrayNameListOPtions {
  id: string;
  name: string;
}
export interface XrayNameListOptionsTypes {
  _id: string;
  user_id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export interface XrayNameListResponse {
  status: string;
  data: XrayNameListOptionsTypes[];
}
