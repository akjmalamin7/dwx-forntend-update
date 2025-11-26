export interface ProfileSelectedDrIdsSchema {
  ignored_dr: string[];
  selected_dr: string[];
}
export interface ProfileSchemaTypes {
  _id: string;
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: "user" | "admin" | string;
  status: "active" | "inactive" | string;
  address: string;
  single: number;
  double: number;
  multiple: number;
  ecg: number;
  is_default: "Yes" | "No";
  hide_bill: "Yes" | "No";
  soft_delete: "Yes" | "No";
  createdAt: string;
  updatedAt: string;
  __v: number;
  ignored_dr: string[];
  selected_dr: string[];
  image: string[];
}

export interface ProfileReferenceResponse {
  status: string;
  data: ProfileSchemaTypes;
}
