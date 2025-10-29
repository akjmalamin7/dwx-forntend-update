import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const PATIENT_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "SL",
    dataIndex: "sl",
    align: "center",
    width: 50,
  },
  {
    title: "DC Name",
    dataIndex: "username",
    key: "username",
    align: "start",
    width: 100,
  },
    {
    key: "month",
    title: "month",
    dataIndex: "month",
    align: "start",
    width: 20,
  },
     
  {
    key: "xray_name",
    title: "Xray Name",
    dataIndex: "xray_name",
    align: "start",
    width: 30,
  },
  
     
  {
    key: "view",
    title: "View Image",
    dataIndex: "view",
    align: "center",
    width: 180,
  },

  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 50,
  },
];
