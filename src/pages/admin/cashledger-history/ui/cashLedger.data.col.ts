import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const CASH_LEDGER_DATA_COL: Columns<DataSource>[] = [
  { key: "sl", title: "SL", dataIndex: "sl", align: "center", width: 20 },
  { key: "date", title: "Date", dataIndex: "date", align: "start", width: 60 },
  { key: "type", title: "Type", dataIndex: "type", align: "center", width: 60 },
  { key: "note", title: "Note", dataIndex: "note", align: "start", width: 100 },
  { key: "amount", title: "Amount", dataIndex: "amount", align: "end", width: 60 },
  { key: "action", title: "Action", dataIndex: "action", align: "center", width: 40 },
];