import type { Columns, DataSource } from "@/shared/ui/table/table.model";

const formatMonth = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const monthName = date.toLocaleString('en-US', { month: 'short' });
  return `${monthName}-${year}`;
};
export const DOCTOR_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "SL",
    dataIndex: "sl",
    align: "center",
    width: 20,
  },
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
    align: "start",
    width: 140,
    render: (value) => formatMonth(value as string),
  }, 
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 70,
  },
];
