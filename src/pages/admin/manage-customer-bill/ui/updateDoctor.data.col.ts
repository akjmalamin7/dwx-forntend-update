import type { Columns, DataSource } from "@/shared/ui/table/table.model";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
export const DOCTOR_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "SL",
    dataIndex: "sl",
    align: "center",
    width: 20,
  },
  {
    title: "DC Name",
    dataIndex: "email",
    key: "email",
    align: "start",
    width: 100,
  },
  {
    key: "address",
    title: "Address",
    dataIndex: "address",
    align: "start",
    width: 30,
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),
  },
          
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 30,
  },
];
