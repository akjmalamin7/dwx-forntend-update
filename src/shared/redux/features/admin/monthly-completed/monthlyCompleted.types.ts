export interface MONTHLY_COMPLETED_MODEL {
  _id: string;   
  count: number;
}

export interface MonthlyCompletedApiResponse {
  success: boolean;
  message: string;
  data: MONTHLY_COMPLETED_MODEL[];
}

export const transformMonthlyCompletedResponse = (
  data: MONTHLY_COMPLETED_MODEL[]
): MONTHLY_COMPLETED_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    count: Number(item.count) || 0,  
  }));
};