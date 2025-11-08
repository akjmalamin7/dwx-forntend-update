import type { Columns, DataSource } from "@/shared/ui/table/table.model"; 
import DOMPurify from "dompurify";
import parse from "html-react-parser";
export const PAYMENT_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "Sl",
    dataIndex: "sl",
    align: "center",
    width: 30,
  },
  {
    key: "name",
    title: "Bank Name",
    dataIndex: "name",
    align: "start",
    width: 500,
  },
  {
    key: "details",
    title: "Bank Details",
    dataIndex: "details",
    align: "start",
    width: 500,
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),
  },
   {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "start",
    width: 30,
  },
];
