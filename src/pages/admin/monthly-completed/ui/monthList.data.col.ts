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
    title: "Month name",
    dataIndex: "key",
    key: "key",
    align: "start", 
  },
   {
    key: "count",
    title: "Total Report",
    dataIndex: "count",
    align: "start", 
  },    
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 60,
  },
];
