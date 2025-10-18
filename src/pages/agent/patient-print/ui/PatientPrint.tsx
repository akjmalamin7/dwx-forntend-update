import { Panel, PanelHeading, Text } from "@/shared/ui"; 
import LOGO from "@/assets/images/logo.png";

const PatientPrint = () => {

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print-specific style */}
      <style>
        {`
          @media print {
            @page {
              margin-top: 2in;  
            } 
          }
        `}
      </style>

      <Panel
        header={
          <PanelHeading
            title="Print Patient Report"
            button=""
            path=""
          />
        }
        size="lg"
      >
        {/* Table */}
        <div className="overflow-x-auto">
           <button
                onClick={handlePrint}
                className="block text-white px-4 py-1 cursor-pointer rounded-md print:hidden"
              >
                 Print Report
              </button>
          <table className="w-full border border-black mb-4">
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  <Text element="label" className="font-semibold">Patient ID:</Text> P-101
                </td>
                <td className="border border-black px-2 py-1 w-1/3">
                  <Text element="label" className="font-semibold">Patient Name:</Text> Miraz
                </td>
                <td className="border border-black px-2 py-1 w-1/3">
                  <Text element="label" className="font-semibold">Age:</Text> 24y
                </td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1">
                  <Text element="label" className="font-semibold">Date:</Text>  
                  {new Date().toLocaleDateString('en-GB')}
                </td>
                <td className="border border-black px-2 py-1">
                  <Text element="label" className="font-semibold">Print Time:</Text> 
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="border border-black px-2 py-1">
                  <Text element="label" className="font-semibold">Sex:</Text> Male
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="border border-black px-2 py-1">
                  <Text element="label" className="font-semibold">Reference By:</Text> Dr. Mahfuj
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Text
          element="h2"
          textAlign="center"
          textDecoration="underline"
          size="3xl"
          fontWeight="bold"
          className="mb-4 font-bold uppercase"
        >
          X-Ray Report of Chest P/A View
        </Text>

        <div>
          <Text element="p">
            Abdomen: <br />
            No free gas shadows are noted under both domes of the Diaphragm.<br /> 
            No abnormal air-fluid level is seen.<br /> 
            No radio-opaque shadow of calcific density are noted in the abdomen.<br />  
            No abnormal soft tissue opacity is noted in abdomen.<br /> 
            Distended gas filled bowel loops are seen in abdomen.<br />  
            Impression: As per description.  
          </Text>
        </div>

        <div className="after:content-[''] after:table after:clear-both"></div>  

        {/* Prepared by + Signature Section */}
       <div
        className="flex justify-between items-center mt-16 print:fixed print:bottom-0 print:left-0 print:right-0   print:mt-0"      >
          <div>
             <Text element="p" >Signature</Text>
            <Text element="p">________________</Text>
           
            <div className="start">
              <img src={LOGO} alt="Logo" className="w-50 mr-4" />
              <Text element="h4" size="xl">Dr. Tamanna Zahan</Text>
              <Text element="p" size="lg">
                MBBS, MD (BMU)<br/>  
                Consultant <br/>  
                Radiology & Imaging<br/>  
                Holy Family Red Crescent Medical College Hospital.<br/>  
                BMDC Reg: A 51221
              </Text>  
              <Text element="p" size="xl" fontWeight='semiBold' className="mt-2 italic text-gray-600">
              N.B. This report has been electronically signed
            </Text> 
            </div>

          </div>

          <div>
            <p className="font-semibold">Prepared by:</p>
            <select className="border border-gray-300 px-2 py-1 print:hidden">
              <option value="">Select a user</option>
              <option value="">User A</option>
              <option value="">User B</option>
              <option value="">User C</option>  
            </select> 

              <div className="checkuserDetails">
                <Text element="p">Technologist</Text> 
              </div>


          </div>
          
        </div> 
      </Panel>
    </>
  );
};

export default PatientPrint;
