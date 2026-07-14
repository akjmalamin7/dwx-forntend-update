import type { Columns, DataSource } from "@/shared/ui/table/table.model";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
export const PATIENT_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "SL",
    dataIndex: "sl",
    align: "center",
    width: 30,
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
    title: "S.Time",
    dataIndex: "start_time",
    align: "start",
    width: 80,
  },


  {
    key: "patient_id",
    title: "P.ID",
    dataIndex: "patient_id",
    align: "start",
    width: 60,
  },
  {
    key: "patient_name",
    title: "P.Name",
    dataIndex: "patient_name",
    align: "start",
    width: 100,
  },
  {
    key: "gender",
    title: "Sex",
    dataIndex: "gender",
    align: "start",
    width: 60,
  },
  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    align: "start",
    width: 60,
  },

  {
    key: "xray_name",
    title: "XrayName",
    dataIndex: "xray_name",
    align: "start",
    width: 120,
  },
  {
    key: "rtype",
    title: "Type",
    dataIndex: "rtype",
    align: "start",
    width: 40,
  },
  {
    key: "selected_dr",
    title: "Selected",
    dataIndex: "selected_dr",
    align: "start",
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),
    width: 130,
  },
  {
    key: "ignored_dr",
    title: "Ignored",
    dataIndex: "ignored_dr",
    align: "start",
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),
    width: 70,
  },
  {
    key: "online_dr",
    title: "OnlineDr",
    dataIndex: "online_dr",
    align: "start",
    width: 80,
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 200,
  },
];
