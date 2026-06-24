import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const EXPENSE_CATEGORY_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "SL",
    dataIndex: "sl",
    align: "center",
    width: 20,
  },
  {
    key: "name",
    title: "Category Name",
    dataIndex: "name",
    align: "start",
    width: 100,
  }, 
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 30,
  },
];