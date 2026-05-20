import type { Columns, DataSource } from "@/shared/ui/table/table.model";
 

const formatMonth = (monthString: string): string => {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  const monthName = date.toLocaleString('en-US', { month: 'short' });
  return `${monthName}-${year}`;
};

export const CUSTOMER_DATA_COL: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "SL",
    dataIndex: "sl",
    align: "center",
    width: 20,
  },
  {
    title: "Bill Month",
    dataIndex: "month",
    key: "month",
    align: "start",
    width: 100,
    render: (value) => formatMonth(value as string),
  }, 
  {
    key: "total_patients",
    title: "Total Patients",
    dataIndex: "total_patients",
    align: "start",
    width: 100,
  },
  {
    key: "total_amount",
    title: "Total Amount",
    dataIndex: "total_amount",
    align: "start",
    width: 100,
  },

  {
    key: "paid_amount",
    title: "Paid Amount",
    dataIndex: "paid_amount",
    align: "start",
    width: 100,
  },
  
  { 
    key: "status",
    title: "Status",
    dataIndex: "status",
    align: "start",
    width: 100,
  },
  { 
    key: "bill_update",
    title: "Bill Update",
    dataIndex: "bill_update",
    align: "start",
    width: 100,
  },
          
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    align: "center",
    width: 20,
  },
];
