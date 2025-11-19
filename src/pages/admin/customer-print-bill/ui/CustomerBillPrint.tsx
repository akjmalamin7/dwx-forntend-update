import FOOTERPAD from "@/assets/images/footer.png"; 
import { Button, Loader, Panel, PanelHeading, Text } from "@/shared/ui";
 
import { useParams } from "react-router-dom";
import { BillPrintList } from "./bill-print-list"; 
import { BillingPadHeader } from "./billing-pad-header";
import { useGetCustomerBillDetailsQuery } from "@/shared/redux/features/admin/manage-customer-bill/billListApi";
import { BillingInformation } from "@/pages/agent/bill-print/ui/billing-information";
import { PaymentMethod } from "@/entities"; 
import { useMemo } from "react";
import { useGetAdminPaymentGetwayListQuery } from "@/shared/redux/features/admin/payment-getway/paymentGetwayApi";
import { usePageTitle } from "@/shared/hooks";

const CustomerBillPrint = () => {
  const { bill_id } = useParams<{ bill_id: string }>();
  const {
    data: bill,
    isLoading: isBillLoading,
    isError: isBillError,
  } = useGetCustomerBillDetailsQuery(bill_id!, { skip: !bill_id });
  const transformBill = bill?.data[0];
 
  const billingHeaderData = { 
    month: transformBill?.month || "N/A",
    printDate: new Date().toLocaleDateString("en-GB") || "N/A", 
    to: transformBill?.user_id?.email || "N/A", 
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
      double: getSafeNumber(transformBill?.user_id, "double"),
      ecg: getSafeNumber(transformBill?.user_id, "ecg"),
      single: getSafeNumber(transformBill?.user_id, "single"),
      multiple: getSafeNumber(transformBill?.user_id, "multiple"),
    },
    total_amount: transformBill?.total_amount
      ? Number(transformBill.total_amount)
      : undefined,
    total_patients: transformBill?.total_patients
      ? Number(transformBill.total_patients)
      : undefined,
  }; 

    const { data: paymentGetway } = useGetAdminPaymentGetwayListQuery();
  
    const paymnetMethod = useMemo(() => {
      return (
        paymentGetway?.data?.map((method) => ({
          name: `${method.details} (${method.name})`,
          value: method.details,
        })) ?? []
      );
    }, [paymentGetway]);

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

    usePageTitle("Print Customer Bill", {
      prefix: "DWX - ",
      defaultTitle: "DWX",
      restoreOnUnmount: true,
    });

      

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
        header={<PanelHeading title="Print Customer Bill" button="" path="" />}
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

           <BillingInformation>
                    <PaymentMethod methods={paymnetMethod} />
                  </BillingInformation>
      
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

export default CustomerBillPrint;
