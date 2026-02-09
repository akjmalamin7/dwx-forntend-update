import type { Columns, DataSource } from "@/shared/ui/table/table.model";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
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
     title: "S.T - C.Time",
    dataIndex: "start_time",
    align: "start",
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),
  }, 
  {
    key: "patient_id",
    title: "P.ID",
    dataIndex: "patient_id",
    align: "start",
  },
  {
    key: "patient_name",
    title: "P.Name",
    dataIndex: "patient_name",
    align: "start",
  },
  {
    key: "patient_sex",
    title: "Sex",
    dataIndex: "patient_sex",
    align: "start",
  },
  {
    key: "patient_age",
    title: "Age",
    dataIndex: "patient_age",
    align: "start",
  },
  {
    key: "xray_name",
    title: "XrayName",
    dataIndex: "xray_name",
    align: "start",
  },
  {
    key: "type",
    title: "Type",
    dataIndex: "type",
    align: "start",
  },
  {
    key: "viewed",
    title: "CompletedBy",
    dataIndex: "viewed",
    align: "start",
  },
  {
    key: "printstatus",
    title: "Print",
    dataIndex: "printstatus",
    align: "start",
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "start",
  },
];
