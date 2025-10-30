export interface MONTH_BILL_MODEL {
  _id: string;
  count: number;
}

export interface MONTH_BILL_TRANSFORM_MODEL {
  month: string;
  count: number;
}

export const transformMonthBillResponse = (
  data: MONTH_BILL_MODEL[]
): MONTH_BILL_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    month: item._id,
    count: item.count,
  }));
};