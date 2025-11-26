import type { Columns, DataSource } from "@/shared/ui/table/table.model";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
export const XRAY_DOCTOR_LIST: Columns<DataSource>[] = [
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
    title: "Role",
    dataIndex: "role",
    align: "start",
    width: 120,
  },
  {
    key: "signature",
    title: "Signature",
    dataIndex: "signature",
    align: "start",
    width: 120,
    render: (value: unknown) => value as React.ReactNode,
  },
  {
    key: "address",
    title: "Address / Designation",
    dataIndex: "address",
    align: "start",
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 50,
  },
];
