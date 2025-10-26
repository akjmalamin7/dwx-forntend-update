import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const PATIENT_PRINT_DATA_COL: Columns<DataSource>[] = [
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
    title: " age",
    dataIndex: "age",
  },
  {
    key: "date",
    title: " date",
    dataIndex: "date",
  },
  {
    key: "print_time",
    title: " Print Time",
    dataIndex: "print_time",
  },
  {
    key: "reference_by",
    title: "Reerence By",
    dataIndex: "reference_by",
  },
];
