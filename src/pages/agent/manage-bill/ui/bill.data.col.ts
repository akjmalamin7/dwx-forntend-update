import type { Columns, DataSource } from "@/shared/ui/table/table.model";

const formatMonth = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const monthName = date.toLocaleString('en-US', { month: 'short' });
  return `${monthName}-${year}`;
};

export const BILL_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "Sl",
    dataIndex: "sl",
    align: "center",
    width: 50,
  },
  {
    key: "month",
    title: "Month Name",
    dataIndex: "month",
    align: "start",
    render: (value) => formatMonth(value as string),
  },
   
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    align: "start",
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 250,
  },
];
