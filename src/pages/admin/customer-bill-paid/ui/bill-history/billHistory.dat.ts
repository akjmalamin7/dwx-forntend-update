import type { Columns, DataSource } from "@/shared/ui/table/table.model";

const formatMonth = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const monthName = date.toLocaleString('en-US', { month: 'short' });
  return `${monthName}-${year}`;
};

export const BILL_HISTORY_DATA_COL: Columns<DataSource>[] = [
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
    render: (value) => formatMonth(value as string),
  },
 
  
  {
    title: "Total Amount",
    dataIndex: "total_amount",
    key: "total_amount",
  },
  {
    title: "Transaction ID",
    dataIndex: "trans_id",
    key: "trans_id",
  },
  
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 130
  },
];
