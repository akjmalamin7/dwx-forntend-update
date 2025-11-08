import { Editor } from "@/features";
import {
  PaymentFormschema,
  type PaymentFormValues,
} from "@/pages/admin/payment-add/ui/paymentAdd.types";
 
import { useAddPaymentMutation } from "@/shared/redux/features/admin/payment/paymentApi";
import { Button, ControlInput, Text } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup"; 
import { Controller, useForm, type SubmitHandler } from "react-hook-form"; 
 
const AdminPaymentForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PaymentFormValues>({
    mode: "onChange",
    resolver: yupResolver(PaymentFormschema),
    defaultValues: {
      name: "",
      details: "", 
    },
  }); 

  const [createPayment, { isLoading: isCreating }] = useAddPaymentMutation(); 
  
  const onSubmit: SubmitHandler<PaymentFormValues> = async (data) => {
    try {
      
        await createPayment(data).unwrap();
        reset();
       
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating Payment:", e.data?.message || e.message);
      } else {
        console.error("Error creating Payment:", String(err));
      }
    }
  };

  const isLoading = isCreating ;
  return (
    <form
      className="grid grid-cols-12 gap-y-4 items-center pt-5 pb-5"
      onSubmit={handleSubmit(onSubmit, (errros) => console.log(errros))}
    >
      <ControlInput
        control={control}
        size="sm"
        label="Bank Name"
        placeholder="Bank Name"
        name="name"
      />

      <Controller
        control={control}
        name="details"
        render={({ field }) => {
          return (
            <div className="col-span-12 block">
              <Editor
                label={<Text fontWeight="medium">Bank Details</Text>} 
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          );
        }}
      />

      {/* Submit */}
      {/* <div className="col-span-3"></div> */}
      <div className="col-span-9 ">
        <div className="flex justify-start">
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
      </div>
    </form>
  );
};

export default AdminPaymentForm;
