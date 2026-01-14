export interface DoctorReference {
  id: string;
  name?: string;
}

export interface DoctorProfileData {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  status: string;
  address: string;
  single: number;
  double: number;
  multiple: number;
  ecg: number;
  is_default: string;
  hide_bill: string;
  soft_delete: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  // any[] এর বদলে string[] ব্যবহার করুন
  ignored_dr: DoctorReference[];
  selected_dr: DoctorReference[];
  id: string;
}

export interface DoctorProfileResponse {
  message: string;
  success: boolean;
  data: DoctorProfileData;
}
