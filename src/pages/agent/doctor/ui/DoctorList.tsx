import { Input, Text } from "@/shared/ui";
 
import { Link } from "react-router-dom";

 

const DoctorList = () => {
 

  return  (
      
       <div className="max-w-7xl mx-auto border border-indigo-200 rounded-md shadow-md">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-md">
        <Text element="h2" className="text-md text-yellow-50 font-semibold">Doctor List</Text>
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
                <th className="border px-3 py-2">Doctor Name</th>
                <th className="border px-3 py-2">Phone Number</th>
                <th className="border px-3 py-2">Designation</th>
                <th className="border px-3 py-2">Category</th> 
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">01</td>
                <td className="border px-3 py-2">Dr Mahfuj</td>
                <td className="border px-3 py-2">01737831156</td>
                <td className="border px-3 py-2">BSC</td>
                <td className="border px-3 py-2">Radiology</td> 
                <td  className="border px-3 py-2">
                  <Link to="/" className="btn btn-sm bg-blue-700 p-2 pl-8 pr-8 rounded text-white m-3">View</Link>
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
      </div>
    </div>

  );
};

export default DoctorList;
