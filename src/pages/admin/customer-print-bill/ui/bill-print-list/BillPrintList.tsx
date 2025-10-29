type IMAGES = {
  total_single: string;
  total_double: string;
  total_multiple: string;
  total_ecg: string;
};
type AMOUNT = {
  double?: number;
  ecg?: number;
  single?: number;
  multiple?: number;
};
type BILL_DATA = {
  images?: IMAGES;
  price?: AMOUNT;
  total_amount?: number;
  total_patients?: number;
};
interface IProps {
  billPrintList?: BILL_DATA;
}
 
const BillPrintList = ({ billPrintList }: IProps) => { 

    const toNum = (value?: string | number) => Number(value) || 0;

  const singleSubtotal =
    toNum(billPrintList?.images?.total_single) *
    toNum(billPrintList?.price?.single);

  const doubleSubtotal =
    toNum(billPrintList?.images?.total_double) *
    toNum(billPrintList?.price?.double);

  const multipleSubtotal =
    toNum(billPrintList?.images?.total_multiple) *
    toNum(billPrintList?.price?.multiple);

  const ecgSubtotal =
    toNum(billPrintList?.images?.total_ecg) *
    toNum(billPrintList?.price?.ecg);

  const totalCost = (billPrintList?.total_amount ?? 0) * 0.018;
  const grandTotal = (billPrintList?.total_amount ?? 0) + totalCost;

  return (
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
        <tr>
          <td className="border p-2">1</td>
          <td className="border p-2">Single</td>
          <td className="border p-2">{billPrintList?.images?.total_single}</td>
          <td className="border p-2">{billPrintList?.price?.single}</td>
          <td className="border p-2">{singleSubtotal.toFixed(2)} ৳</td>
        </tr>
        <tr>
          <td className="border p-2">2</td>
          <td className="border p-2">Double</td>
          <td className="border p-2">{billPrintList?.images?.total_double}</td>
          <td className="border p-2">{billPrintList?.price?.double}</td>
          <td className="border p-2">{doubleSubtotal.toFixed(2)} ৳</td>
        </tr>
        <tr>
          <td className="border p-2">3</td>
          <td className="border p-2">Muliple</td>
          <td className="border p-2">
            {billPrintList?.images?.total_multiple}
          </td>
          <td className="border p-2">{billPrintList?.price?.multiple}</td>
          <td className="border p-2">{multipleSubtotal.toFixed(2)}  ৳</td>
        </tr>
        <tr>
          <td className="border p-2">4</td>
          <td className="border p-2">ECG</td>
          <td className="border p-2">{billPrintList?.images?.total_ecg}</td>
          <td className="border p-2">{billPrintList?.price?.ecg}</td>
          <td className="border p-2">{ecgSubtotal.toFixed(2)}  ৳</td>
        </tr> 

        <tr>
          <td className="border p-2">5</td>
          <td className="border p-2" colSpan={3}>
            Charge
          </td>
          <td className="border p-2">{totalCost.toFixed(0)}   ৳</td>
        </tr>


        <tr className="font-semibold bg-gray-100">
          <td className="border p-2 text-left" colSpan={2}>
            Total
          </td>
          <td className="border p-2">
            {billPrintList?.total_patients} Pics
          </td>
          <td className="border p-2"></td>
          <td className="border p-2">{grandTotal.toFixed(0)}   ৳</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BillPrintList;
