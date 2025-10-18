import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const PATIENT_VIEW_DAT_COL: Columns<DataSource>[] = [
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
    key: "date",
    title: "Date",
    dataIndex: "date",
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
  {
    key: "xray_name",
    title: "Xray Name",
    dataIndex: "xray_name",
  },
  {
    key: "reference_by",
    title: "Reference By",
    dataIndex: "reference_by",
  },
];
