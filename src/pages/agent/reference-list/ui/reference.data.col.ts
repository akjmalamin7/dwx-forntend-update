import type { Columns, DataSource } from "@/shared/ui/table/table.model"; 
export const REFERENCE_DOCTOR_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "Sl",
    dataIndex: "sl",
    align: "center",
    width: 30,
  },
  {
    key: "name",
    title: "Reference Doctor Name",
    dataIndex: "name",
    align: "start",
    width: 500,
  },
   {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "start",
    width: 30,
  },
];
