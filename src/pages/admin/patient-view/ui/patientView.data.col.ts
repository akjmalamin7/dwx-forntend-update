import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const PATIENT_VIEW_DAT_COL: Columns<DataSource>[] = [
  
    {
    key: "agent_name",
    title: "DC Name",
    dataIndex: "agent_name",
  },
  {
    key: "patient_id",
    title: "Patient ID",
    dataIndex: "patient_id",
  },

  {
    key: "patient_name",
    title: "Patient Name",
    dataIndex: "patient_name",
  },
  {
    key: "age",
    title: "AGe",
    dataIndex: "age",
  },
 
  {
    key: "history",
    title: "History",
    dataIndex: "history",
  },
  {
    key: "sex",
    title: "Sex",
    dataIndex: "sex",
  },
 
];
