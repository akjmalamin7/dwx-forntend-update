export interface FormatListOptions {
  id: string;
  title: string;  
}
export interface FormatListOptionsTypes {
  _id: string;
  id: string;
  user_id: string;
  title: string;
  details: string;
  type: "AdminFormat" | "DoctorFormat";
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export interface FormatListResponse {
  type: string;
  data: FormatListOptionsTypes[];
}
