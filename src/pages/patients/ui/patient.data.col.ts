import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const PATIENT_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "Sl",
    dataIndex: "sl",
    align: "center",
    width: 10,
  },
  {
    key: "start_time",
    title: "S.Time",
    dataIndex: "start_time",
    align: "start",
    width: 10,
  },
  {
    key: "patient_id",
    title: "P.ID",
    dataIndex: "patient_id",
    align: "start",
    width: 10,
  },
  {
    key: "patient_name",
    title: "P.Name",
    dataIndex: "patient_name",
    align: "start",
    width: 180,
  },
  {
    key: "patient_sex",
    title: "Sex",
    dataIndex: "patient_sex",
    align: "start",
    width: 10,
  },
  {
    key: "patient_age",
    title: "Age",
    dataIndex: "patient_age",
    align: "start",
    width: 10,
  },
  {
    key: "xray_name",
    title: "XrayName",
    dataIndex: "xray_name",
    align: "start",
    width: 160,
  },
  {
    key: "type",
    title: "Type",
    dataIndex: "type",
    align: "start",
    width: 10,
  },/*
  {
    key: "selected_dr",
    title: "SelectedDr",
    dataIndex: "selected_dr",
    align: "start",
    width: 30,
  },
  {
    key: "ignore_dr",
    title: "IgnoredDr",
    dataIndex: "ignore_dr",
    align: "start",
    width: 30,
  },*/
  {
    key: "online_dr",
    title: "OnlineDr",
    dataIndex: "online_dr",
    align: "start",
    width: 30,
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "start",
       width: 30,
  },
];
