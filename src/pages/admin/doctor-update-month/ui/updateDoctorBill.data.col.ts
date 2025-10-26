import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const DOCTOR_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "SL",
    dataIndex: "sl",
    align: "center",
    width: 20,
  },
  {
    title: "Bill Month",
    dataIndex: "month",
    key: "month",
    align: "start",
    width: 100,
  },
  {
    key: "total_patients",
    title: "Total Patient",
    dataIndex: "total_patients",
    align: "start",
    width: 100,
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
