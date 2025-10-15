import { Input, Panel, Text } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import {
  DUMMY_TABLE_COLUMN,
  DUMMY_TABLE_DATA,
} from "@/shared/ui/table/table.dummyData";

const PatientAllCompleted = () => {
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
          columns={DUMMY_TABLE_COLUMN}
          dataSource={DUMMY_TABLE_DATA}
          size="lg"
          scroll={true}
          hover={true}
          border="bordered"
          bg="transparent"
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
