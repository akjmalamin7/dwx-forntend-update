import FOOTERPAD from "@/assets/images/footer.png"; 
import { Button, Loader, Panel, PanelHeading, Text } from "@/shared/ui";
 
import { useParams } from "react-router-dom";
import { BillPrintList } from "./bill-print-list"; 
import { BillingPadHeader } from "./billing-pad-header";
import { useGetBillDetailsQuery } from "@/shared/redux/features/admin/manage-doctor-bill/billListApi";

const DoctorBillPrint = () => {
  const { bill_id } = useParams<{ bill_id: string }>();
  const {
    data: bill,
    isLoading: isBillLoading,
    isError: isBillError,
  } = useGetBillDetailsQuery(bill_id!, { skip: !bill_id });
  const transformBill = bill?.data[0];
 
  const billingHeaderData = { 
    month: transformBill?.month || "N/A",
    printDate: new Date().toLocaleDateString("en-GB") || "N/A", 
    to: transformBill?.doctor_id?.email || "N/A", 
    status: transformBill?.status,
  };

  const getSafeNumber = (obj: unknown, key: string): number => {
    if (obj && typeof obj === "object" && obj !== null && key in obj) {
      const value = (obj as Record<string, unknown>)[key];
      return typeof value === "number" ? value : 0;
    }
    return 0;
  };

  const billPrint = {
    images: {
      total_single: transformBill?.total_single || "0",
      total_double: transformBill?.total_double || "0",
      total_multiple: transformBill?.total_multiple || "0",
      total_ecg: transformBill?.total_ecg || "0",
    },
    price: {
      double: getSafeNumber(transformBill?.doctor_id, "double"),
      ecg: getSafeNumber(transformBill?.doctor_id, "ecg"),
      single: getSafeNumber(transformBill?.doctor_id, "single"),
      multiple: getSafeNumber(transformBill?.doctor_id, "multiple"),
    },
    total_amount: transformBill?.total_amount
      ? Number(transformBill.total_amount)
      : undefined,
    total_patients: transformBill?.total_patients
      ? Number(transformBill.total_patients)
      : undefined,
  }; 

  const handlePrint = () => {
    window.print();
  };
  if (isBillLoading) <Loader />;
  if (isBillError)
    return (
      <Text size="md" color="danger">
        Error occured
      </Text>
    );
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
        header={<PanelHeading title="Print Patient Report" button="" path="" />}
        size="lg"
      >
        <Button
          onClick={handlePrint}
          className="block text-white px-4 py-1 cursor-pointer rounded-md print:hidden"
        >
          Print Bill
        </Button>
        {/* Table */}
        <BillingPadHeader billingHeader={billingHeaderData} />
        <BillPrintList billPrintList={billPrint} />

      
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none print:opacity-100 opacity-20 text-6xl font-bold  text-green-300"
          style={{ zIndex: 0 }}
        >
          {transformBill?.status=="Paid"?"Paid":"Un-paid"}
        </div>

        <div className="after:content-[''] after:table after:clear-both"></div>

        {/*Footer Section*/}
        <div className="flex justify-between items-center mt-16 print:fixed print:bottom-0 print:left-0 print:right-0   print:mt-0">
          <div>
            <img src={FOOTERPAD} alt="Footer" className="w-full" />
          </div>
        </div>
      </Panel>
    </>
  );
};

export default DoctorBillPrint;
