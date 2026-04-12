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
    title: "S.T",
    dataIndex: "start_time",
    align: "start", 
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),
    width:80,
  },
  {
    key: "end_time",
    title: "C.Time",
    dataIndex: "end_time",
    align: "start", 
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),
    width: 80,
  },

  {
    key: "patient_id",
    title: "P.ID",
    dataIndex: "patient_id",
    align: "start", 
    width: 50,
  },
  {
    key: "patient_name",
    title: "P.Name",
    dataIndex: "patient_name",
    align: "start", 
    width: 80,
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
    width: 150,
  },
  {
    key: "completed_dr",
    title: "Rep. By",
    dataIndex: "completed_dr",
    align: "start", 
    width: 80,
  },
   
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    align: "start", 
    width: 50,
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "end", 
    width: 210,
  },
];
