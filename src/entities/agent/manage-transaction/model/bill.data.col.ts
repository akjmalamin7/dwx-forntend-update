import type { Columns, DataSource } from "@/shared/ui/table/table.model"; 
export const BILL_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "Sl",
    dataIndex: "sl",
    align: "center",
    width: 50,
  },
  {
    key: "month",
    title: "Month Name",
    dataIndex: "month",
    align: "start", 
  },
  {
    key: "total_patients",
    title: "Total Patients",
    dataIndex: "total_patients",
    align: "end", 
  },
  {
    key: "total_single",
    title: "Single",
    dataIndex: "total_single",
    align: "end", 
  },
  {
    key: "total_double",
    title: "Double",
    dataIndex: "total_double",
    align: "end", 
  },
  {
    key: "total_multiple",
    title: "Multiple",
    dataIndex: "total_multiple",
    align: "end", 
  },
  {
    key: "total_ecg",
    title: "ECG",
    dataIndex: "total_ecg",
    align: "end", 
  },
  {
    key: "total_ecg",
    title: "ECG",
    dataIndex: "total_ecg",
    align: "end", 
  },
  {
    key: "total_amount",
    title: "Total Bill",
    dataIndex: "total_amount",
    align: "end", 
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    align: "start", 
  }, 
   {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
  },
];
