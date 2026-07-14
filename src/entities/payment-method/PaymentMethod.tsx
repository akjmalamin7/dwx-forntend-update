import { Text } from "@/shared/ui"; 
import DOMPurify from "dompurify";
import parse from "html-react-parser";
type PaymentMethodType = {
  name: string;
  details?: string;
  value: string;
};

interface IProps {
  methods?: PaymentMethodType[]; 
}


const PaymentMethod = ({ methods = [] }: IProps) => {
  const leftBox = methods.slice(0, 6);
  const rightBox = methods.slice(6); 
  return (
    <div className="grid grid-cols-2 gap-6 mt-3">
      {/* Left Box */}
      <div className="space-y-1 text-2xl">
        {leftBox.map((method, index) => (
        <Text
          key={`${method.name}-${index}`}
          element="div"
          className="text-2xl"
        >
           {method.name} 
        </Text>
      ))}
      </div>

      {/* Right Box */}
      <div className="space-y-1 text-2xl">
        {rightBox.map((method) => ( 
          <div key={method.value} className="text-2xl"> 
            <Text key={method.value} element="div" className="text-2xl"> 
              {parse(DOMPurify.sanitize(String(method.details ?? "")))}
            </Text>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
