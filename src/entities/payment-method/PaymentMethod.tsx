import { Text } from "@/shared/ui";
type PaymentMethodType = {
  name: string;
  value: string;
};
interface IProps {
  methods?: PaymentMethodType[];
}
const PaymentMethod = ({ methods }: IProps) => {
  return (
    <div className="space-y-1 mt-3">
      {methods?.map((method) => (
        <Text key={method.value} element="p">
          {method.name}
        </Text>
      ))}
    </div>
  );
};

export default PaymentMethod;
