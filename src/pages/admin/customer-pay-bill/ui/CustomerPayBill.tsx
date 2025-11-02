import {
  useAddCustomerBillPayMutation,
  useGetCustomerBillDetailsQuery,
} from "@/shared/redux/features/admin/manage-customer-bill/billListApi";
import { ADD_CUSTOMER_BILL_PAY_SCHEMA } from "@/shared/redux/features/admin/manage-customer-bill/CustomerAddBillPay.types";
import {
  Button,
  ControlInput,
  Loader,
  Panel,
  PanelHeading,
  Text,
} from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { BillInfo } from "./bill-info";

const CustomerPayBill = () => {
  const { bill_id } = useParams<{ bill_id: string }>();
  const {
    data,
    isLoading: isBillLoading,
    isError: isBillError,
  } = useGetCustomerBillDetailsQuery(bill_id!, { skip: !bill_id });

  const transformBill = data?.data[0];

  const roundedGrandTotal = Number(transformBill?.total_amount ?? 0);

  console.log("Rounded Grand Total:", typeof roundedGrandTotal);
  const bill = {
    month: transformBill?.month || "N/A",
    total_amount: roundedGrandTotal,
    to: transformBill?.user_id?.email || "N/A",
  };
  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    resolver: yupResolver(ADD_CUSTOMER_BILL_PAY_SCHEMA),
    values: {
      received_number: transformBill?.received_number || "",
      total_bill: Number(roundedGrandTotal),
      month: transformBill?.month ?? "",
      trans_id: transformBill?.trans_id || "",
    },
  });
  console.log(transformBill);

  const [createBillPayment, { isLoading }] = useAddCustomerBillPayMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const finalData = {
        ...data,
        user_id: transformBill?.user_id?._id,
      };
      console.log("Payload Sending:", finalData);
      await createBillPayment(finalData).unwrap();
      reset();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating patient:", e.data?.message || e.message);
      } else {
        console.error("Error creating patient:", String(err));
      }
    }
  });

  if (isBillLoading) <Loader />;
  if (isBillError)
    return (
      <Text size="md" color="danger">
        Error occured
      </Text>
    );

  return (
    <>
      <Panel
        header={<PanelHeading title="Customer Pay Bill" button="" path="" />}
        size="lg"
      >
        {/* Table */}
        <BillInfo bill={bill} />

        <div className="flex   mt-16 gap-6">
          {/* Left Side: Payment Form */}
          <div className="w-full md:w-1/2">
            <form className="grid pt-5 pb-5" onSubmit={onSubmit}>
              {/* Account Number */}

              <ControlInput
                control={control}
                size="sm"
                label="Received Account Number"
                placeholder="Received Account Number"
                name="received_number"
              />

              {/* Total Pay */}
              <ControlInput
                control={control}
                size="sm"
                label="Total Pay"
                placeholder="Total Pay"
                name="total_bill"
                type="number"
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
                  // disabled={!isDirty}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Panel>
    </>
  );
};

export default CustomerPayBill;
