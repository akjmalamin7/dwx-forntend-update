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
    title: "DC",
    dataIndex: "agent_name",
    key: "agent_name",
    align: "start",
    width: 80,
  },
  {
    key: "start_time",
    title: "C.Time",
    dataIndex: "start_time",
    align: "start",
    width: 30,
  },

  {
    key: "patient_id",
    title: "P.ID",
    dataIndex: "patient_id",
    align: "start",
    width: 40,
  },
  {
    key: "patient_name",
    title: "P.Name",
    dataIndex: "patient_name",
    align: "start",
    width: 130,
  },

  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    align: "start",
    width: 20,
  },

  {
    key: "xray_name",
    title: "Xray name",
    dataIndex: "xray_name",
    align: "start",
    width: 150,
  },
  {
    key: "completed_dr",
    title: "Rep. By",
    dataIndex: "completed_dr",
    align: "start",
    width: 70,
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "end",
    width: 100,
  },
];
