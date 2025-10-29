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
    title: "Dr Name",
    dataIndex: "agent_id",
    key: "agent_id",
    align: "start",
    width: 100,
  },
  {
    key: "xray_name",
    title: "S.Time",
    dataIndex: "xray_name",
    align: "start",
    width: 30,
  },
  
    
  {
    key: "image_type",
    title: "P.ID",
    dataIndex: "image_type",
    align: "start",
    width: 100,
  },
  {
    key: "patient_id",
    title: "P.Name",
    dataIndex: "patient_id",
    align: "start",
    width: 180,
  },
  {
    key: "month",
    title: "month",
    dataIndex: "month",
    align: "start",
    width: 20,
  },
     
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 50,
  },
];
