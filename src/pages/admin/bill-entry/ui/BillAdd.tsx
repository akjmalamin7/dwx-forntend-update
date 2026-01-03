import { BillEntryForm } from "@/entities/admin/bill-entry";
import { useCreateBillEntryMutation } from "@/entities/admin/bill-entry/api/mutation";
import { BILL_ENTRY_SCHEMA } from "@/entities/admin/bill-entry/model/schema";
import { usePageTitle } from "@/shared/hooks";
import { Button, Panel, PanelHeading } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

const BillAdd = () => {
  const [createBillEntry, { isLoading }] = useCreateBillEntryMutation();
  const form = useForm({
    resolver: yupResolver(BILL_ENTRY_SCHEMA),
    defaultValues: {
      user_id: "",
      month: "",
      total_single: 0,
      total_double: 0,
      total_multiple: 0,
      total_ecg: 0,
    },
    mode: "onChange",
  });
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createBillEntry(data).unwrap();
      form.reset();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating history:", e.data?.message || e.message);
      } else {
        console.error("Error creating history:", String(err));
      }
    }
  });

  usePageTitle("Add Bill", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel header={<PanelHeading title="Bill Entry" button=" " path="" />}>
      <FormProvider {...form}>
        <div className=" w-full flex flex-col gap-4 pt-5 pb-5">
          <BillEntryForm />
          <div className="col-span-3"></div>
          <div className="col-span-9">
            <Button
              color="dark"
              size="size-2"
              type="submit"
              onClick={onSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              loading={isLoading}
              disabled={!form.formState.isValid}
            >
              {isLoading ? "Submitting" : "Submit"}
            </Button>
          </div>
        </div>
      </FormProvider>
    </Panel>
  );
};

export default BillAdd;
