export interface ReferenceListOPtions {
  id: string;
  name: string;
}
export interface ReferenceListOptionsTypes {
  _id: string;
  id: string;
  user_id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export interface ReferenceListResponse {
  status: string;
  data: ReferenceListOptionsTypes[];
}
