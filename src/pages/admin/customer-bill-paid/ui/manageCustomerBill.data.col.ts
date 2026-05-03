import type { Columns, DataSource } from "@/shared/ui/table/table.model";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const formatMonth = (monthString: string): string => {
  const [year, month] = monthString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const monthName = date.toLocaleString("en-US", { month: "short" });
  return `${monthName}-${year}`;
}

export const CUSTOMER_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "SL",
    dataIndex: "sl",
    align: "center",
    width: 20,
  },
  {
    title: "DC Name",
    dataIndex: "customer",
    key: "customer",
    align: "start",
    width: 100,
  },
  {
    title: "Bill Monthd",
    dataIndex: "month",
    key: "month",
    align: "start",
    width: 100,
    render: (value) => formatMonth(value as string),
  },
  
  {
    key: "total_amount",
    title: "Total Amount",
    dataIndex: "total_amount",
    align: "start",
    width: 100,
  },
  {
    key: "paid_amount",
    title: "Paid Amount",
    dataIndex: "paid_amount",
    align: "start",
    width: 100,
  },
  {
    key: "payment_date",
    title: "Payment Date",
    dataIndex: "payment_date",
    align: "start",
    width: 180,
  },
  {
    key: "received_number",
    title: "Received Number",
    dataIndex: "received_number", 
    align: "start",
    width: 180,
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    align: "start",
    width: 100,
  },
          
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 20,
  },
];
