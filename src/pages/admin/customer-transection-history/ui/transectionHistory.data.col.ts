import type { Columns, DataSource } from "@/shared/ui/table/table.model";
 
export const MONTH_DATA_COL: Columns<DataSource>[] = [
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
    width: 360,
  }, 
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 30,
  },
];
