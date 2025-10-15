import { Button } from "../button";
import type { Columns, DataSource } from "./table.model";
export const DUMMY_TABLE_DATA: DataSource[] = [
  {
    key: "1",
    sl: "01",
    startTime: "12:13AM",
    pId: "P-1001",
    pName: "Mahfuj",
    sex: "Male",
    age: "25Y",
    xrayName: "Chest",
    type: "Xray",
    viewed: "Mr. Mahfuj",
  },
  {
    key: "2",
    sl: "02",
    startTime: "12:13AM",
    pId: "P-1001",
    pName: "",
    sex: "Male",
    age: "25Y",
    xrayName: "Chest",
    type: "Xray",
    viewed: "Mr. Mahfuj",
  },
  {
    key: "3",
    sl: "03",
    startTime: "12:13AM",
    pId: "P-1001",
    pName: "M",
    sex: "Male",
    age: "25Y",
    xrayName: "Chest",
    type: "Xray",
    viewed: "Mr. Mahfuj",
  },
  {
    key: "4",
    sl: "04",
    startTime: "12:13AM",
    pId: "P-1001",
    pName: "Manik",
    sex: "Male",
    age: "25Y",
    xrayName: "Chest",
    type: "Xray",
    viewed: "Mr. Mahfuj",
  },
];
export const DUMMY_TABLE_COLUMN: Columns<DataSource>[] = [
  {
    key: "sl",
    title: "Sl",
    dataIndex: "sl",
    align: "center",
    width: 50,
  },
  {
    key: "startTime",
    title: "Start Time",
    dataIndex: "startTime",
    align: "center",
    width: 100,
  },
  { key: "pId", title: "P.ID", dataIndex: "pId", align: "center", width: 80 },
  {
    key: "pName",
    title: "P.Name",
    dataIndex: "pName",
    align: "start",
    width: 120,
  },
  { key: "sex", title: "Sex", dataIndex: "sex", align: "center", width: 70 },
  { key: "age", title: "Age", dataIndex: "age", align: "center", width: 70 },
  {
    key: "xrayName",
    title: "Xray Name",
    dataIndex: "xrayName",
    align: "start",
    width: 100,
  },
  { key: "type", title: "Type", dataIndex: "type", align: "end", width: 80 },
  {
    key: "viewed",
    title: "Viewed",
    dataIndex: "viewed",
    align: "center",
    width: 120,
    render: (value, record, index) => {
      // const isLastRow = index === DUMMY_TABLE_DATA.length - 1;
      // if (isLastRow) return null;
      return (
        <Button
          variant="text"
          color="primary"
          onClick={() => console.log(value, record)}
        >
          View {DUMMY_TABLE_DATA.length} {index}
        </Button>
      );
    },
  },
];
