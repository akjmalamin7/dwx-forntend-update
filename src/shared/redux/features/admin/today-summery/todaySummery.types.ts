export interface TODAY_SUMMARY_MODEL {
  _id: string;  
  totalCompleted: number;
  userId: string;
  name: string;
  address: string;
  mobile: string;
  email: string;
}

export interface TodaySummaryApiResponse {
  success: boolean;
  message: string;
  data: TODAY_SUMMARY_MODEL[];
}

export const transformTodaySummaryResponse = (
  data: TODAY_SUMMARY_MODEL[]
): TODAY_SUMMARY_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    totalCompleted: item.totalCompleted ?? 0,
    userId: item.userId,
    name: item.name || "Unknown",
    address: item.address || "N/A",
    mobile: item.mobile || "N/A",
    email: item.email || "N/A",
  }));
};