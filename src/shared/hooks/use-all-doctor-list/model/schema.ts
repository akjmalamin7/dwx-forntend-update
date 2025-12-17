export interface ALL_DOCTOR_LIST_TYPES {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  role: string;
  address?: string;
  image?: string[][] | string[];
  id: string;
}
export interface ALL_DOCTOR_LIST_RESPONSE {
  message: string;
  success: boolean;
  data: ALL_DOCTOR_LIST_TYPES[];
}
