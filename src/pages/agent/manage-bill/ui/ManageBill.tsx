import { Input, Panel, Text } from "@/shared/ui";
import { Link } from "react-router-dom";

const ManageBill = () => {
  return (
    <Panel header="Manage Bill" size="md"> 

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-3 py-2">Sl</th>
              <th className="border px-3 py-2">Month</th>
              <th className="border px-3 py-2">Status</th> 
              <th className="border px-3 py-2 w-50">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-1">01</td>
              <td className="border px-3 py-1">Octorber - 2025</td>
              <td className="border px-3 py-1">Unpaid</td> 
              <td className="border px-3 py-1">
                <Link
                  to="/agent/pay-bill"
                  className="bg-blue-700 px-4 py-2 inline-block rounded text-white"
                >
                  Pay Bill
                </Link>
                 <Link
                  to="/"
                  className="bg-blue-700 px-4 py-2 inline-block rounded text-white ml-2"
                >
                  Print Bill
                </Link>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} className="text-center border px-3 py-2">
                Total Report: <strong>0 Pics</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Panel>
  );
};

export default ManageBill;
