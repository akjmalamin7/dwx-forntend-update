import type { Columns, DataSource } from "@/shared/ui/table/table.model";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
export const DOCTOR_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "Sl",
    dataIndex: "sl",
    align: "center",
    width: 50,
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    align: "start",
    width: 180,
  },
  {
    key: "mobile",
    title: "Mobile",
    dataIndex: "mobile",
    align: "start",
    width: 150,
  },
  {
    key: "role",
    title: "Department",
    dataIndex: "role",
    align: "start",
    width: 120,
  },
  {
    key: "address",
    title: "Designation",
    dataIndex: "address",
    align: "start",
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),
  },
];
