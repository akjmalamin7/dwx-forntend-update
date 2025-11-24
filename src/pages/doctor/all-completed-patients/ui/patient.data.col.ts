import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const PATIENT_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "Sl",
    dataIndex: "sl",
    align: "center",
    width: 50,
  },
 
  {
    key: "end_time",
    title: "End Time",
    dataIndex: "end_time",
    align: "start",
  },
  {
    key: "patient_id",
    title: "P.ID",
    dataIndex: "patient_id",
    align: "start",
  },
  {
    key: "patient_name",
    title: "P.Name",
    dataIndex: "patient_name",
    align: "start",
  },
  {
    key: "patient_sex",
    title: "Sex",
    dataIndex: "patient_sex",
    align: "start",
  },
  {
    key: "patient_age",
    title: "Age",
    dataIndex: "patient_age",
    align: "start",
  },
  {
    key: "xray_name",
    title: "Xray name",
    dataIndex: "xray_name",
    align: "start",
  },
 
 
  {
    key: "printstatus",
    title: "Print",
    dataIndex: "printstatus",
    align: "start",
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "start",
  },
];
