import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const PATIENT_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "SL",
    dataIndex: "sl",
    align: "center",
    // width: 50,
  },

  {
    title: "DC",
    dataIndex: "agent_name",
    key: "agent_name",
    align: "start",
    // width: 100,
  },
  {
    key: "start_time",
    title: "S.Time",
    dataIndex: "start_time",
    align: "start",
    width: 30,
  },


  {
    key: "patient_id",
    title: "P.ID",
    dataIndex: "patient_id",
    align: "start",
    // width: 100,
  },
  {
    key: "patient_name",
    title: "P.Name",
    dataIndex: "patient_name",
    align: "start",
    // width: 180,
  },
  {
    key: "gender",
    title: "Sex",
    dataIndex: "gender",
    align: "start",
    // width: 20,
  },
  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    align: "start",
    // width: 20,
  },

  {
    key: "xray_name",
    title: "Xray name",
    dataIndex: "xray_name",
    align: "start",
    // width: 180,
  },
  {
    key: "rtype",
    title: "Type",
    dataIndex: "rtype",
    align: "start",
    // width: 20,
  },
  {
    key: "selected_dr",
    title: "Selected",
    dataIndex: "selected_dr",
    align: "start",
    // width: 60,
  },
  {
    key: "ignored_dr",
    title: "Ignored",
    dataIndex: "ignored_dr",
    align: "start",
    // width: 60,
  },
  {
    key: "online_dr",
    title: "Online Dr",
    dataIndex: "online_dr",
    align: "start",
    // width: 60,
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 150,
  },
];
