import HEADERPAD from "@/assets/images/header.jpg";
import { Text } from "@/shared/ui";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
type BillingType = {
  month?: string;
  printDate?: string;
  to?: string;
  status?: string;
  address?: string;
};
interface IProps {
  billingHeader?: BillingType;
}
const BillingPadHeader = ({ billingHeader }: IProps) => {

    const formatMonthYear = (value?: string) => {
  if (!value) return "";
  return new Date(`${value}-01`).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};

  return (
    <div className="overflow-x-auto">
      <img src={HEADERPAD} alt="Header" className="w-full mb-4" />

      <div className="flex flex-wrap justify-between items-start mb-4  p-2">
        <div>
          <Text element="p">
                      <strong>Bill Month:</strong> {formatMonthYear(billingHeader?.month)}
                    </Text>
                    <Text element="p">
                      <strong>Print Date:</strong> {billingHeader?.printDate}
                    </Text>
                    <Text element="p">
                      <strong>To:</strong> {billingHeader?.to}
                    </Text>
                    <Text element="p">
                      {parse(DOMPurify.sanitize(String(billingHeader?.address) || ""))} 
                    </Text>
                    <Text element="p" className="mt-2">
                      <strong>Dear Customer</strong>,
                    </Text>
                  <Text element="p" className="text-2xl">
                    Your {formatMonthYear(billingHeader?.month)}, X-Ray & ECG reporting bill is attached herewith for your kind review. <br/>
                    Kindly check the details below and complete the payment within the due date.
                  </Text>
                  <Text element="p" className="mt-2">
                   Thank you for choosing <strong>Digital Web Expert</strong>
                  </Text>
                  
        </div>
        <div className="text-right">
          <Text element="p">
            <strong>Bill Status:</strong>{" "}
            {billingHeader?.status && (
              <span className="text-red-600">{billingHeader?.status=="Paid"?"Paid":"Un-paid"}</span>
            )}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default BillingPadHeader;
