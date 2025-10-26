import { Button, Panel, PanelHeading, Text } from "@/shared/ui"; 
import HEADERPAD from "@/assets/images/header.jpg";
import FOOTERPAD from "@/assets/images/footer.png";

const DoctorBillPrint = () => {

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
              margin: 0 0.5in;  
            } 
          }
        `}
      </style>
      
      <Panel
        header={
          <PanelHeading
            title="Doctor Print Bill"
            button=""
            path=""
          />
        }
        size="lg"
      >
        <Button
          onClick={handlePrint}
          className="block text-white px-4 py-1 cursor-pointer rounded-md print:hidden"
        >
            Print Bill
        </Button>
        {/* Table */}
        <div className="overflow-x-auto">
          <img src={HEADERPAD} alt="Header" className="w-full mb-4 h-30" />

          <div className="flex flex-wrap justify-between items-start mb-4  p-2">
            <div>
              <Text element="p"><strong>Bill Month:</strong> 2025-10</Text>
              <Text element="p"><strong>Print Date:</strong> 10/10/2025</Text>
              <Text element="p"><strong>To:</strong> Digital Web Xray</Text>
            </div>
            <div className="text-right">
              <Text element="p"><strong>Bill Status:</strong> <span className="text-red-600">Paid</span></Text> 
            </div>
          </div> 


          <table className="w-full border border-black mb-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">SL</th>
                  <th className="border p-2">Image Type</th>
                  <th className="border p-2">Total Image</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr key="1">
                  <td className="border p-2">1</td>
                  <td className="border p-2">Single</td>
                  <td className="border p-2">1</td>
                  <td className="border p-2">20</td>
                  <td className="border p-2">
                    20 ৳
                  </td>
                </tr>
                <tr key="1">
                  <td className="border p-2">1</td>
                  <td className="border p-2">Double</td>
                  <td className="border p-2">1</td>
                  <td className="border p-2">20</td>
                  <td className="border p-2">
                    20 ৳
                  </td>
                </tr>
                <tr key="1">
                  <td className="border p-2">1</td>
                  <td className="border p-2">Muliple</td>
                  <td className="border p-2">1</td>
                  <td className="border p-2">20</td>
                  <td className="border p-2">
                    20 ৳
                  </td>
                </tr>
                <tr key="1">
                  <td className="border p-2">1</td>
                  <td className="border p-2">ECG</td>
                  <td className="border p-2">1</td>
                  <td className="border p-2">20</td>
                  <td className="border p-2">
                    20 ৳
                  </td>
                </tr>
 
                <tr>
                  <td className="border p-2">5</td>
                  <td className="border p-2"  colSpan={3}>Charge</td> 
                  <td className="border p-2">20 ৳</td>
                </tr>
                <tr className="font-semibold bg-gray-100">
                  <td className="border p-2 text-left" colSpan={2}>Total</td>
                  <td className="border p-2">1 Pics</td>
                  <td className="border p-2"></td>
                  <td className="border p-2">40 ৳</td>
                </tr>
              </tbody>
            </table> 
        </div> 

        <div>
              <Text element="h2" fontWeight="semiBold" textDecoration="underline" className="mb-2 mt-5">Payment Information</Text> 
               <div className="space-y-1 mt-3">
                <Text element="p">01737831156 (Bkash Personal)</Text>  
                <Text element="p">01737831156 (Roket Personal)</Text>  
                <Text element="p">01737831156 (Nagad Personal)</Text>  
                <Text element="p">01737831156 (Upay Personal)</Text>  
                <Text element="p">01737831156 (DBBL Bank)</Text>  
              </div>
        </div>

        <div className="border-t pt-4 mb-6  p-2"> 
         <Text element="p" fontWeight="medium" size="sm" className="text-red-600">   প্রত্যেক মাসের ১০ তারিখের মধ্যে পূর্ববর্তী মাসের বিল পরিশোধের জন্য বিনীত অনুরোধ করা যাচ্ছে।</Text>
         <Text element="p" fontWeight="medium" size="sm" className="text-red-600">বিঃদ্রঃ টাকা পাঠানোর পর ফোন করে আপনার বিল নিশ্চিত / বিল পরিশোধ (Paid) করুন।</Text>
          </div>  
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none print:opacity-100 opacity-20 text-6xl font-bold  text-green-300"
            style={{ zIndex: 0 }}
          >
          PAID 
          </div>
         

        <div className="after:content-[''] after:table after:clear-both"></div>   

        {/*Footer Section*/}
       <div
        className="flex justify-between items-center mt-16 print:fixed print:bottom-0 print:left-0 print:right-0   print:mt-0"      >
          <div>
            <img src={FOOTERPAD} alt="Footer" className="w-full" /> 
          </div> 
        </div> 
      </Panel> 
      </>
  );
};

export default DoctorBillPrint;
