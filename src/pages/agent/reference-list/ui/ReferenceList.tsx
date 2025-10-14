import { Input, Panel, Text } from "@/shared/ui";
import { Link } from "react-router-dom";

const ReferenceList = () => {

  const header = (
    <div>
      <div className="flex justify-between">
        <div className="">
          <Text element="h2" className="text-md text-yellow-50 font-semibold">Reference List</Text> 
        </div>
        <div>
          <Link to="/agent/reference-add" className="px-3 py-2 bg-white text-black block rounded-2">Reference Add</Link>
        </div>
      </div>
    </div>
  );
  return (
    <Panel header={header} size="lg" >
      {/* Search Field */}
      <div className="mb-4 w-1/2">
        <Text element="label" className="font-semibold mr-2">
          Search:
        </Text>
        <Input
          size="sm"
          placeholder="Search by Name..."
          type="text"
          className="borde border-gray-300 px-2 py-1 rounded-sm focus:outline-none focus:ring focus:border-blue-400 text-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-3 py-2 w-15">Sl</th>
              <th className="border px-3 py-2">Reference Doctor Name</th> 
              <th className="border px-3 py-2 w-20">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">01</td>
              <td className="border px-3 py-2">Dr Mahfuj</td> 
              <td className="border px-3 py-2">
                <Link
                  to="/"
                  className="btn btn-sm bg-blue-700 p-2 pl-8 pr-8 rounded text-white m-1 block"
                >
                  Edit
                </Link>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-center border px-3 py-2">
                Total Report: <strong>0 Pics</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Panel>
  );
};

export default ReferenceList;
