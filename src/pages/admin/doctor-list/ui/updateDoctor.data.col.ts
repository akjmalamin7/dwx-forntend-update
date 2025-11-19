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
    title: "Doctor Name",
    dataIndex: "email",
    key: "email",
    align: "start",
    width: 100,
  },
  {
    key: "role",
    title: "Department",
    dataIndex: "role",
    align: "start",
    width: 30,
  },
          
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 30,
  },
];
