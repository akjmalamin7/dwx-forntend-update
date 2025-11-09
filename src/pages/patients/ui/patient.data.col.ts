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
    key: "start_time",
    title: "Stat Time",
    dataIndex: "start_time",
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
    key: "type",
    title: "Type",
    dataIndex: "type",
    align: "start",
  },
  {
    key: "selected_dr",
    title: "Selected Dr",
    dataIndex: "selected_dr",
    align: "start",
  },
  {
    key: "ignore_dr",
    title: "Ignored Dr",
    dataIndex: "ignore_dr",
    align: "start",
  },
  {
    key: "online_dr",
    title: "Online Dr",
    dataIndex: "online_dr",
    align: "start",
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "start",
  },
];
