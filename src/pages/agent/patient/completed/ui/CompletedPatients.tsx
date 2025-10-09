import { Input, Text } from "@/shared/ui";
 
import { Link } from "react-router-dom";

 

const CompletedPatients = () => {
 

  return  (
      
       <div className="max-w-7xl mx-auto border border-indigo-200 rounded-md shadow-md">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-md">
        <Text element="h2" className="text-md text-yellow-50 font-semibold">Completed Report</Text>
      </div>

      {/* Body */}
      <div className="p-4 bg-white">
        {/* Search Field */}
        <div className="mb-4">
          <Text element="label"  className="font-semibold mr-2">Search:</Text>
          <Input 
          size="sm" 
          placeholder="Search by ID or Name..."
          type="text"  
          className="borde border-gray-300 px-2 py-1 rounded-sm focus:outline-none focus:ring focus:border-blue-400 text-sm" />
         
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">Sl</th>
                <th className="border px-3 py-2">Start Time</th>
                <th className="border px-3 py-2">P.ID</th>
                <th className="border px-3 py-2">P.Name</th>
                <th className="border px-3 py-2">Sex</th>
                <th className="border px-3 py-2">Age</th>
                <th className="border px-3 py-2">Xray name</th>
                <th className="border px-3 py-2">Type</th>
                <th className="border px-3 py-2">Viewed</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">01</td>
                <td className="border px-3 py-2">12: 13AM</td>
                <td className="border px-3 py-2">P-1001</td>
                <td className="border px-3 py-2">Mahfuj</td>
                <td className="border px-3 py-2">Male</td>
                <td className="border px-3 py-2">25Y</td>
                <td className="border px-3 py-2">Chest</td>
                <td className="border px-3 py-2">Xray</td>
                <td className="border px-3 py-2">Mr. Mahfuj</td>
                <td  className="border px-3 py-2">
                  <Link to="/" className="btn btn-sm">View</Link>
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">01</td>
                <td className="border px-3 py-2">12: 13AM</td>
                <td className="border px-3 py-2">P-1001</td>
                <td className="border px-3 py-2"></td>
                <td className="border px-3 py-2">Male</td>
                <td className="border px-3 py-2">25Y</td>
                <td className="border px-3 py-2">Chest</td>
                <td className="border px-3 py-2">Xray</td>
                <td className="border px-3 py-2">Mr. Mahfuj</td>
                <td  className="border px-3 py-2">
                  <Link to="/" className="btn btn-sm">View</Link>
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">01</td>
                <td className="border px-3 py-2">12: 13AM</td>
                <td className="border px-3 py-2">P-1001</td>
                <td className="border px-3 py-2">MIftahul</td>
                <td className="border px-3 py-2">Male</td>
                <td className="border px-3 py-2">25Y</td>
                <td className="border px-3 py-2">Chest</td>
                <td className="border px-3 py-2">Xray</td>
                <td className="border px-3 py-2">Mr. Mahfuj</td>
                <td  className="border px-3 py-2">
                  <Link to="/" className="btn btn-sm">View</Link>
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">01</td>
                <td className="border px-3 py-2">12: 13AM</td>
                <td className="border px-3 py-2">P-1001</td>
                <td className="border px-3 py-2">Manik</td>
                <td className="border px-3 py-2">Male</td>
                <td className="border px-3 py-2">25Y</td>
                <td className="border px-3 py-2">Chest</td>
                <td className="border px-3 py-2">Xray</td>
                <td className="border px-3 py-2">Mr. Mahfuj</td>
                <td  className="border px-3 py-2">
                  <Link to="/" className="btn btn-sm">View</Link>
                </td>
              </tr>
             
            </tbody>
            <tfoot>
               <tr>
                <td colSpan={10} className="text-center border px-3 py-2">
                  Total Report: <strong>0 Pics</strong>
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 px-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50" disabled>
              Previous
            </button>

            <div className="space-x-1 text-sm">
              <button className="bg-blue-700 text-white px-3 py-1 rounded">1</button>
              <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">2</button>
              <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">3</button>
              <span>...</span>
              <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">10</button>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
              Next
            </button>
          </div>
          
        </div>
      </div>
    </div>

  );
};

export default CompletedPatients;
