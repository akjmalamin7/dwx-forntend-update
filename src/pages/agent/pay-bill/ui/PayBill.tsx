import { PaymentMethod } from "@/entities";
import { usePageTitle } from "@/shared/hooks"; 
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
import toast, { Toaster } from "react-hot-toast";
import { useInitOnlinePaymentMutation } from "@/shared/redux/features/agent/online-payment/onlinePaymentApi";


const formatMonthLabel = (monthStr?: string): string => {
  if (!monthStr) return "";
  const [year, month] = monthStr.split("-");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];
  return monthName ? `${monthName}-${year}` : monthStr;
};

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
        name: method.name, 
        details: method.details || "",
        value: method.name,
      })) ?? []
    );
  }, [paymentGetway]);

  const transformBill = data?.data[0];
  const amount = Number(transformBill?.total_amount) || 0;
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
        received_number: transformBill.received_number || paymnetMethod[0]?.value || "",
        total_bill: String(roundedGrandTotal),
        month: transformBill.month || "",
        trans_id: transformBill.trans_id || "",
      });
    }
  }, [transformBill, reset, roundedGrandTotal]);

  const [createBillPayment, { isLoading }] = useAddBillPayMutation();
  const [initOnlinePayment, { isLoading: isOnlineLoading }] = useInitOnlinePaymentMutation(); // নতুন

  const onSubmit: SubmitHandler<BillPayFormValues> = async (data) => {
    try {
      await createBillPayment(data).unwrap();
      toast.success("Bill Request submitted successfully!", {
        duration: 2000,
        position: "top-right",
      });
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating patient:", e.data?.message || e.message);
      } else {
        console.error("Error creating patient:", String(err));
      }
      toast.error("Failed to submit bill request. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  //  নতুন হ্যান্ডলার: Online Payment
  const handlePayOnline = async () => {
  try {
    const customer = transformBill?.user_id;
    const isValidEmail = customer?.email && /\S+@\S+\.\S+/.test(customer.email);
    const stripHtml = (html?: string) => html ? html.replace(/<[^>]*>/g, "").trim() : "";

    const res = await initOnlinePayment({
      total_amount: bill.total_amount,
      month: bill.month,
      product_name: `Bill for ${formatMonthLabel(bill.month)}`, // ⬅️ এখানে পাঠানো হচ্ছে
      bill_id: transformBill?._id,
      user_id: customer?._id,
      cus_name: customer?.name || "Customer",
      cus_email: isValidEmail ? customer!.email! : "customer@dwxapp.store",
      cus_add1: stripHtml(customer?.address) || "N/A",
      cus_phone: "01700000000",
    }).unwrap();

    if (res?.data?.url) {
      window.location.href = res.data.url;
    } else {
      toast.error("Payment gateway URL পাওয়া যায়নি।");
    }
  } catch (err) {
    console.error("Online payment init failed:", err);
    toast.error("Payment শুরু করা যায়নি। আবার চেষ্টা করুন।");
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
      <Toaster />
      <Panel
        header={<PanelHeading title="Pay Bill" button="" path="" />}
        size="lg"
      >
        <BillInfo bill={bill} />

        {/* ⬅️ নতুন: Pay with Online বাটন */}
        <div className="mt-4 mb-2 flex justify-end" style={{ display: "none" }}>
          <Button
            color="dark"
            size="size-2"
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            loading={isOnlineLoading}
            onClick={handlePayOnline}
          >
            {isOnlineLoading ? "Redirecting..." : "Pay with Online"}
          </Button>
        </div>

        <div className="flex mt-16 gap-6">
          <div className="w-full md:w-1/2">
            <Panel
              header={<PanelHeading title="Payment Bill" button="" path="" />}
              size="lg"
            >
              <form className="grid pt-5 pb-5" onSubmit={handleSubmit(onSubmit)}>
                <ControlledSelect
                  label="Account Number"
                  control={control}
                  name="received_number"
                  options={paymnetMethod}
                />
                <ControlInput
                  control={control}
                  size="sm"
                  label="Total Pay"
                  placeholder="Total Pay"
                  name="total_bill"
                />
                <ControlInput
                  control={control}
                  size="sm"
                  label="Month"
                  placeholder="Month"
                  name="month"
                />
                <ControlInput
                  control={control}
                  size="sm"
                  label="Transaction ID"
                  placeholder="Transaction ID"
                  name="trans_id"
                />
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