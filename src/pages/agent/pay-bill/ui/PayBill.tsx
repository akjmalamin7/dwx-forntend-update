import { Button, ControlInput, ControlledSelect, Panel, PanelHeading, Text } from "@/shared/ui"; 
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BillPayFormschema, type BillPayFormValues } from "@/shared/redux/features/agent/bill-pay/AddBillPay.types";
import { useAddBillPayMutation } from "@/shared/redux/features/agent/bill-pay/AddBillPayApi";

const PayBill = () => {

 
      const {
        control,
        handleSubmit,
        reset,
        formState: { isValid },
      } = useForm<BillPayFormValues>({
        mode: "onChange",
        resolver: yupResolver(BillPayFormschema),
        defaultValues: { 
          received_number: "01737831156",
          total_bill: "41",
          month: "Jan-2025",
          trans_id: "tx-10111",
        },
      });

       const [createBillPayment, { isLoading }] = useAddBillPayMutation();
        
          const onSubmit: SubmitHandler<BillPayFormValues> = async (data) => {
           
            try {
              await createBillPayment(data).unwrap();
              reset(); 
            } catch (err: unknown) {
              if (err && typeof err === "object" && "data" in err) {
                const e = err as { data?: { message?: string }; message?: string };
                console.error("Error creating patient:", e.data?.message || e.message);
              } else {
                console.error("Error creating patient:", String(err));
              }
            }
          };
       



  return (
    <> 

      <Panel
        header={
          <PanelHeading
            title="Pay Bill"
            button=""
            path=""
          />
        }
        size="lg"
      >
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-black mb-4">
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  <Text element="label" className="font-semibold">Month:</Text> July - 2025
                </td>
                <td className="border border-black px-2 py-1 w-1/3">
                  <Text element="label" className="font-semibold">Total Bill: </Text> 41 ৳
                </td> 
              </tr> 
            </tbody>
          </table>
        </div>   
        <div className="flex   mt-16 gap-6">
          {/* Left Side: Payment Form */}
          <div className="w-full md:w-1/2"> 
            <Panel
              header={
                <PanelHeading
                  title="Payment Bill"
                  button=""
                  path=""
                />
              }
              size="lg"
            >
            <form
              className="grid pt-5 pb-5"
              onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            > 
              {/* Account Number */}
              <ControlledSelect
                label="Account Number"
                control={control}
                name="received_number"
                options={[
                  { name: "01737831156 (Bkash Personal)", value: "01737831156" },
                  { name: "01517005298 - Roket", value: "01517005298 - Roket" }, 
                ]}
              /> 

              {/* Total Pay */}
              <ControlInput
                control={control}
                size="sm"
                label="Total Pay"
                placeholder="Total Pay"
                name="total_bill"
              /> 

              {/* Month */}
              <ControlInput
                control={control}
                size="sm"
                label="Month"
                placeholder="Month"
                name="month"
              /> 

              {/* Transaction ID */}
              <ControlInput
                control={control}
                size="sm"
                label="Transaction ID"
                placeholder="Transaction ID"
                name="trans_id"
              /> 

              {/* Submit */}
              <div className="mt-3">
                <Button
                  color="dark"
                  size="size-2"
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  loading={isLoading}
                  disabled={!isValid}
                >
                  {isLoading ? "Submitting..." : "Submit"} 
                </Button>
              </div>
            </form>
          </Panel>
          </div>

          {/* Right Side: Payment Method */}
          <div className="w-full md:w-1/2">
            <Panel
              header={
                <PanelHeading
                  title="Payment Method"
                  button=""
                  path=""
                />
              }
              size="lg"
            >
            <Text element="h3" size="xl" fontWeight="bold">Payment Method</Text>   
            <div className="space-y-1 mt-3">
              <Text element="p">01737831156 (Bkash Personal)</Text>  
              <Text element="p">01737831156 (Roket Personal)</Text>  
              <Text element="p">01737831156 (Nagad Personal)</Text>  
              <Text element="p">01737831156 (Upay Personal)</Text>  
              <Text element="p">01737831156 (DBBL Bank)</Text>  
            </div>
</Panel>
          </div>
        </div>

      </Panel>
    </>
  );
};

export default PayBill;
