import type { Columns, DataSource } from "@/shared/ui/table/table.model";

export const LOAN_DATA_COL: Columns<DataSource>[] = [
  { key: "sl", title: "SL", dataIndex: "sl", align: "center", width: 20 },
  {
    key: "employee_name",
    title: "Employee",
    dataIndex: "employee_name",
    align: "start",
    width: 100,
  },
  {
    key: "total_loan",
    title: "Total Loan",
    dataIndex: "total_loan",
    align: "end",
    width: 60,
  },
  {
    key: "total_paid",
    title: "Total Paid",
    dataIndex: "total_paid",
    align: "end",
    width: 60,
  },
  {
    key: "total_remaining",
    title: "Remaining",
    dataIndex: "total_remaining",
    align: "end",
    width: 60,
  },
  {
    key: "active_count",
    title: "Active Loans",
    dataIndex: "active_count",
    align: "center",
    width: 50,
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 40,
  },
];