import type { Columns, DataSource } from "@/shared/ui/table/table.model";
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
