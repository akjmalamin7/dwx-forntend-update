import { Text } from "@/shared/ui";
type BillType = {
  to: string;
  month: string;
  total_amount: string;
};
interface IProps {
  bill: BillType;
}
const BillInfo = ({ bill }: IProps) => {

  const amount = Number(bill?.total_amount) || 0;
 
 
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-black mb-4">
        <tbody>
          <tr>
             <td className="border border-black px-2 py-1 w-1/3">
              <Text element="label" className="font-semibold">
                Pay to:
              </Text>{" "}
              {bill?.to || "N/A"}
            </td>
            <td className="border border-black px-2 py-1 w-1/3">
              <Text element="label" className="font-semibold">
                Month:
              </Text>{" "}
              {bill?.month || "N/A"}
            </td>
            <td className="border border-black px-2 py-1 w-1/3">
              <Text element="label" className="font-semibold">
                Total Bill:{" "}
              </Text>{" "}
              {amount} ৳  
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BillInfo;
