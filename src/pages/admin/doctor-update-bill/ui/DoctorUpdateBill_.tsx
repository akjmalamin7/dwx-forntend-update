import {  Panel, PanelHeading } from "@/shared/ui";  
import { Link } from "react-router-dom";

const DoctorUpdateBill = () => {

 
  return (  
      <Panel
        header={
          <PanelHeading
            title="Doctor Update Bill"
            button=""
            path=""
          />
        }
        size="lg"
      >
         
        <div className="overflow-x-auto"> 


          <table className="w-full border border-black mb-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">SL</th>
                  <th className="border p-2">Doctor Name	</th>
                  <th className="border p-2">Image Type	</th>
                  <th className="border p-2">View Image	</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr key="1">
                  <td className="border p-2">1</td>
                  <td className="border p-2">Dr. Mahfuj</td>
                  <td className="border p-2">1</td>
                  <td className="border p-2">
                    <Link to="" className="bg-green-800 px-3 py-2 m-2 text-white rounded">ImageView</Link>
                  </td>
                  <td className="border p-2">
                    <select className="">
                      <option>Single</option>
                      <option>Double</option>
                      <option>Multiple</option>
                      <option>ECG</option>
                    </select>
                  </td>
                </tr> 

              </tbody>
            </table> 
        </div> 

         
      </Panel>  
  );
};

export default DoctorUpdateBill;
