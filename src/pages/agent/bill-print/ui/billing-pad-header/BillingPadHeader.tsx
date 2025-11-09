import HEADERPAD from "@/assets/images/header.jpg";
import { Text } from "@/shared/ui";
type BillingType = {
  month?: string;
  printDate?: string;
  to?: string;
  status?: string;
};
interface IProps {
  billingHeader?: BillingType;
}
const BillingPadHeader = ({ billingHeader }: IProps) => {


  return (
    <div className="overflow-x-auto">
      <img src={HEADERPAD} alt="Header" className="w-full mb-4" />

      <div className="flex flex-wrap justify-between items-start mb-4  p-2">
        <div>
          <Text element="p">
            <strong>Bill Month:</strong> {billingHeader?.month}
          </Text>
          <Text element="p">
            <strong>Print Date:</strong> {billingHeader?.printDate}
          </Text>
          <Text element="p">
            <strong>To:</strong> {billingHeader?.to}
          </Text>
        </div>
        <div className="text-right">
          <Text element="p">
            <strong>Bill Status:</strong>{" "}
            {billingHeader?.status && (
              <span className="text-red-600">{billingHeader.status}</span>
            )}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default BillingPadHeader;
