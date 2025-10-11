export interface DoctorOption {
  id: string;
  name: string;
}

// A single doctor record from your backend
export interface DoctorResponseTypes {
  _id: string;
  id: string; // same as _id (your backend includes both)
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: string; // e.g. "xray_dr"
  status: "active" | "inactive" | string;
  address: string;
  single: number;
  double: number;
  multiple: number;
  ecg: number;
  is_default: "Yes" | "No";
  hide_bill: "Yes" | "No";
  soft_delete: "Yes" | "No";
  image: string[][]; // since it's an array inside an array
  createdAt: string;
  updatedAt: string;
  __v: number;
  ignored_dr: string[];
  selected_dr: string[];
}
// The full API response object
export interface DoctorApiResponse {
  status: string; // e.g. "success"
  data: DoctorResponseTypes[];
}
