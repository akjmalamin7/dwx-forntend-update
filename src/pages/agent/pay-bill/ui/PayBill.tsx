import { PaymentMethod } from "@/entities";
import {
  BillPayFormschema,
  type BillPayFormValues,
} from "@/shared/redux/features/agent/bill-pay/AddBillPay.types";
import { useAddBillPayMutation } from "@/shared/redux/features/agent/bill-pay/AddBillPayApi";
import { useGetBillQuery } from "@/shared/redux/features/agent/manage-bill/billListApi";
import { useGetPaymentGetwayListQuery } from "@/shared/redux/features/agent/payment-getway/paymentGetwayApi";
import {
  Button,
  ControlInput,
  ControlledSelect,
  Loader,
  Panel,
  PanelHeading,
  Text,
} from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { BillInfo } from "./bill-info";
import { usePageTitle } from "@/shared/hooks";

const PayBill = () => {
  const { month } = useParams<{ month: string }>();
  const {
    data,
    isLoading: isBillLoading,
    isError: isBillError,
  } = useGetBillQuery(month!, { skip: !month });
  const { data: paymentGetway } = useGetPaymentGetwayListQuery();

  const paymnetMethod = useMemo(() => {
    return (
      paymentGetway?.data?.map((method) => ({
        name: `${method.details} (${method.name})`,
        value: method.details,
      })) ?? []
    );
  }, [paymentGetway]);

  const transformBill = data?.data[0];

  const amount = Number(transformBill?.total_amount) || 0;

  // Add 1.8% charge
  const totalCost = amount * 0.018;
  const grandTotal = amount + totalCost;
  const roundedGrandTotal = Math.round(grandTotal);

  const bill = {
    month: transformBill?.month || "N/A",
    total_amount: String(roundedGrandTotal),
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<BillPayFormValues>({
    mode: "onChange",
    resolver: yupResolver(BillPayFormschema),
    defaultValues: {
      received_number: "",
      total_bill: "",
      month: "",
      trans_id: "",
    },
  });
  useEffect(() => {
    if (transformBill) {
      reset({
        received_number: "",
        total_bill: String(roundedGrandTotal),
        month: transformBill.month || "N/A",
        trans_id: "",
      });
    }
  }, [transformBill, reset]);

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


  usePageTitle("Pay Bill", {
      prefix: "DWX - ",
      defaultTitle: "DWX",
      restoreOnUnmount: true,
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
        header={<PanelHeading title="Pay Bill" button="" path="" />}
        size="lg"
      >
        {/* Table */}
        <BillInfo bill={bill} />

        <div className="flex   mt-16 gap-6">
          {/* Left Side: Payment Form */}
          <div className="w-full md:w-1/2">
            <Panel
              header={<PanelHeading title="Payment Bill" button="" path="" />}
              size="lg"
            >
              <form
                className="grid pt-5 pb-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Account Number */}
                <ControlledSelect
                  label="Account Number"
                  control={control}
                  name="received_number"
                  options={paymnetMethod}
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
              header={<PanelHeading title="Payment Method" button="" path="" />}
              size="lg"
            >
              <Text element="h3" size="xl" fontWeight="bold">
                Payment Method
              </Text>
              <PaymentMethod methods={paymnetMethod} />
            </Panel>
          </div>
        </div>
      </Panel>
    </>
  );
};

export default PayBill;
