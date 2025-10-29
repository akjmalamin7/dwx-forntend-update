 import {
  Button,
  ControlInput, 
  Loader,
  Panel,
  PanelHeading,
  Text,
} from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { BillInfo } from "./bill-info";
import { useAddCustomerBillPayMutation, useGetCustomerBillDetailsQuery } from "@/shared/redux/features/admin/manage-customer-bill/billListApi";
import { AddCustomerBillPayFormschema,  type CustomerBillPayFormValues } from "@/shared/redux/features/admin/manage-customer-bill/CustomerAddBillPay.types";

const CustomerPayBill = () => {
  const { bill_id } = useParams<{ bill_id: string }>();
  const {
    data,
    isLoading: isBillLoading,
    isError: isBillError,
  } = useGetCustomerBillDetailsQuery(bill_id!, { skip: !bill_id });
 

  const transformBill = data?.data[0];

  const roundedGrandTotal = Number(transformBill?.total_amount) || 0;
 

  const bill = {
    month: transformBill?.month || "N/A",
    total_amount: String(roundedGrandTotal),
    to: transformBill?.user_id?.email || "N/A", 
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CustomerBillPayFormValues>({
    mode: "onChange",
    resolver: yupResolver(AddCustomerBillPayFormschema),
    defaultValues: {
      received_number: "",
      total_bill: "",
      month:  "",
      trans_id: transformBill?.trans_id,
      user_id: transformBill?.user_id,
    },
  });
  useEffect(() => {
    if (transformBill) {
      reset({
        received_number: transformBill?.received_number || "",
        total_bill: String(roundedGrandTotal),
        month: transformBill.month || "N/A",
        trans_id: transformBill?.trans_id || "", 
        user_id: transformBill?.user_id,
      });
    }
  }, [transformBill, reset]);

  const [createBillPayment, { isLoading }] = useAddCustomerBillPayMutation();

  const onSubmit: SubmitHandler<CustomerBillPayFormValues> = async (data) => {
    try {
       const finalData = {
        ...data,
        user_id: transformBill?.user_id?._id,
      }; 
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
  };

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
            
              <form
                className="grid pt-5 pb-5"
                onSubmit={handleSubmit(onSubmit)}
              >
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
          </div>

          
        </div>
      </Panel>
    </>
  );
};

export default CustomerPayBill;
