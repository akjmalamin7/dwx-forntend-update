import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const INCOME_SUMMARY_DATA_COL: Columns<DataSource>[] = [
  { key: "sl", title: "SL", dataIndex: "sl", align: "center", width: 20 },
  {
    key: "category_name",
    title: "Category",
    dataIndex: "category_name",
    align: "start",
    width: 100,
  },
  {
    key: "count",
    title: "Entries",
    dataIndex: "count",
    align: "center",
    width: 40,
  },
  {
    key: "total",
    title: "Total Amount",
    dataIndex: "total",
    align: "end",
    width: 60,
  },
];