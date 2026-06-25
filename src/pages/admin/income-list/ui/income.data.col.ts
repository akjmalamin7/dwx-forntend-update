import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const INCOME_DATA_COL: Columns<DataSource>[] = [
  { key: "sl", title: "SL", dataIndex: "sl", align: "center", width: 20 },
  { key: "title", title: "Title", dataIndex: "title", align: "start", width: 100 },
  { key: "category", title: "Category", dataIndex: "category", align: "start", width: 80 },
  { key: "amount", title: "Amount", dataIndex: "amount", align: "end", width: 60 },
  { key: "month", title: "Month", dataIndex: "month", align: "center", width: 50 },
  { key: "action", title: "Action", dataIndex: "action", align: "center", width: 40 },
];