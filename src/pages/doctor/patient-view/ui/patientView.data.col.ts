import type { Columns, DataSource } from "@/shared/ui/table/table.model";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
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
  dataIndex: "createdAt",
  render: (value: unknown) => {
    if (!value) return "-";

    const date =
      value instanceof Date ? value : new Date(String(value));

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  },
},

 {
  key: "history",
  title: "History",
  dataIndex: "history",
  render: (value: unknown) =>
    parse(
      DOMPurify.sanitize(
        `<span style="color:red;font-size:26px;font-weight:500">
          ${String(value || "")}
        </span>`
      )
    ),
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
