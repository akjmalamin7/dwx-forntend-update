import { Text } from "@/shared/ui";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

type PaymentMethodType = {
  name: string;
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
          <strong>{method.name}</strong>:{" "}
          {parse(DOMPurify.sanitize(String(method.value) || ""))}
        </Text>
      ))}
      </div>

      {/* Right Box */}
      <div className="space-y-1 text-2xl">
        {rightBox.map((method) => (
          <Text key={method.value} element="div" className="text-2xl">
            <strong>{method.name}</strong>:{" "}
            {parse(DOMPurify.sanitize(String(method.value) || ""))}
          </Text>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
