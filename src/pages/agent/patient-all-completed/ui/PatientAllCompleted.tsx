import { Input, Panel, Text } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { Columns, DataSource } from "@/shared/ui/table/table.model";

const PatientAllCompleted = () => {
  const data: DataSource[] = [
    { key: "1", sl: "01", startTime: "12:13AM", pId: "P-1001", pName: "Mahfuj", sex: "Male", age: "25Y", xrayName: "Chest", type: "Xray", viewed: "Mr. Mahfuj" },
    { key: "2", sl: "01", startTime: "12:13AM", pId: "P-1001", pName: "", sex: "Male", age: "25Y", xrayName: "Chest", type: "Xray", viewed: "Mr. Mahfuj" },
    { key: "3", sl: "01", startTime: "12:13AM", pId: "P-1001", pName: "M", sex: "Male", age: "25Y", xrayName: "Chest", type: "Xray", viewed: "Mr. Mahfuj" },
    { key: "4", sl: "01", startTime: "12:13AM", pId: "P-1001", pName: "Manik", sex: "Male", age: "25Y", xrayName: "Chest", type: "Xray", viewed: "Mr. Mahfuj" },
  ];

  const columns: Columns<DataSource>[] = [
    { key: "sl", title: "Sl", dataIndex: "sl", align: "center", width: 50 },
    { key: "startTime", title: "Start Time", dataIndex: "startTime", align: "center", width: 100 },
    { key: "pId", title: "P.ID", dataIndex: "pId", align: "center", width: 80 },
    { key: "pName", title: "P.Name", dataIndex: "pName", align: "start", width: 120 },
    { key: "sex", title: "Sex", dataIndex: "sex", align: "center", width: 70 },
    { key: "age", title: "Age", dataIndex: "age", align: "center", width: 70 },
    { key: "xrayName", title: "Xray Name", dataIndex: "xrayName", align: "start", width: 100 },
    { key: "type", title: "Type", dataIndex: "type", align: "center", width: 80 },
    {
      key: "viewed",
      title: "Viewed",
      dataIndex: "viewed",
      align: "center",
      width: 120,
      render: (value, record) => (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
          onClick={() => console.log(value, record)}
        >
          View
        </button>
      ),
    },
  ];
  return (
    <Panel header="All Completed Report" size="lg">
      <div className="mb-4">
        <Text element="label" className="font-semibold mr-2">
          Search:
        </Text>
        <div>
          <Input
            size="sm"
            placeholder="Search by ID or Name..."
            type="text"
            className="borde border-gray-300 px-2 py-1 rounded-sm focus:outline-none focus:ring focus:border-blue-400 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={data}
          size="lg"
          scroll={true}
          hover={true}
          border="bordered"
          bg="striped"
        />


        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
            disabled
          >
            Previous
          </button>

          <div className="space-x-1 text-sm">
            <button className="bg-blue-700 text-white px-3 py-1 rounded">
              1
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
              2
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
              3
            </button>
            <span>...</span>
            <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
              10
            </button>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
            Next
          </button>
        </div>
      </div>
    </Panel>
  );
};

export default PatientAllCompleted;
