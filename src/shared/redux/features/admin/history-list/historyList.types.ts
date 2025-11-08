export interface HistoryListOPtions {
  id: string;
  name: string;
}
export interface HistoryListOptionsTypes {
  _id: string;
  id: string;
  user_id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  _v: number;
}
export interface HistoryListResponse {
  status: string;
  data: HistoryListOptionsTypes[];
}
