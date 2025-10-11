export interface PatientHistoryListOptions {
  id: string;
  name: string;
}
export interface PatientHistoryOptionTypes {
  _id: string;
  id: string;
  user_id: string;
  name: string;
  status: "active" | "inactive" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface PatientHistoryResponse {
  status: string; // e.g. "success"
  data: PatientHistoryOptionTypes[];
}
