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
    width: 100,
  },
  {
    title: "DC Name",
    dataIndex: "agent_name",
    key: "agent_name",
    align: "start",
    width: 100,
  },
    
  {
    key: "patient_id",
    title: "P.ID",
    dataIndex: "patient_id",
    align: "start",
    width: 100,
  },
  {
    key: "patient_name",
    title: "P.Name",
    dataIndex: "patient_name",
    align: "start",
    width: 180,
  },
 
  {
    key: "xray_name",
    title: "Xray name",
    dataIndex: "xray_name",
    align: "start",
    width: 180,
  }, 
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 50,
  },
];
