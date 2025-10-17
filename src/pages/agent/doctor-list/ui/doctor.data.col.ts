import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const DOCTOR_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "Sl",
    dataIndex: "sl",
    align: "center",
    width: 50,
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    align: "start",
  },
  {
    key: "mobile",
    title: "Mobile",
    dataIndex: "mobile",
    align: "start",
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
    align: "start",
  },
  {
    key: "address",
    title: "Designation",
    dataIndex: "address",
    align: "start",
  }
   
];
