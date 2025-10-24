import type { Columns, DataSource } from "@/shared/ui/table/table.model";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
export const SUMMERY_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "SL",
    dataIndex: "sl",
    align: "center",
    width: 20,
  },
  {
    title: "DC Name",
    dataIndex: "agent_name",
    key: "agent_name",
    align: "start",
    width: 40,
  },
   {
    key: "totalCompleted",
    title: "Total Completed",
    dataIndex: "totalCompleted",
    align: "start",
    width: 100,
  }, 
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "start",
    width: 40,
  },
  {
    key: "mobile",
    title: "Mobile",
    dataIndex: "mobile",
    align: "start",
    width: 30,
  },
  
    
  {
    key: "address",
    title: "Address",
    dataIndex: "address",
    align: "start",
    width: 40,
    render: (value: unknown) => parse(DOMPurify.sanitize(String(value) || "")),

  },
 
];
