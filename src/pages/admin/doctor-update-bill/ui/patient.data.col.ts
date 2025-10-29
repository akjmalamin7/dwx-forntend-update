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
    title: "Dr Name",
    dataIndex: "email",
    key: "email",
    align: "start",
    width: 100,
  },

   {
    key: "month",
    title: "Month",
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
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 50,
  },
];
