import { usePageTitle } from "@/shared/hooks";
import { useCreateManualEntryMutation } from "@/shared/redux/features/admin/cash-ledger/cashLedgerApi";
import { Button, ControlInput, ControlledSelect, Panel, PanelHeading } from "@/shared/ui";
import {
  manualEntrySchema,
  type ManualEntryFormValues,
} from "@/shared/utils/types/types"; 
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const CashLedgerManualEntry = () => {
  const [createManualEntry, { isLoading }] = useCreateManualEntryMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ManualEntryFormValues>({
    mode: "onChange",
    resolver: yupResolver(manualEntrySchema),
    defaultValues: {
      type: "manual_deposit",
      amount: 0,
      note: "",
    },
  });

  const onSubmit: SubmitHandler<ManualEntryFormValues> = async (data) => {
    try {
      await createManualEntry(data).unwrap();
      reset({ type: "manual_deposit", amount: 0, note: "" });

      toast.success("Entry recorded successfully!", {
        duration: 2000,
        position: "top-right",
      });
    } catch (err: unknown) {
      console.error("Error creating manual entry:", err);
      toast.error("Failed to record entry. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  usePageTitle("Manual Cash Entry", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <>
      <Toaster />
      <Panel
        header={
          <PanelHeading
            title="Manual Deposit / Withdraw"
            button="Cash Ledger History"
            path="/admin/cash-ledger/history"
          />
        }
        size="md"
      >
        <form
          className="grid grid-cols-12 gap-y-4 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ControlledSelect
            label="Type"
            control={control}
            name="type"
            options={[
              { name: "Deposit (Add to balance)", value: "manual_deposit" },
              { name: "Withdraw (Subtract from balance)", value: "manual_withdraw" },
            ]}
          />

          <ControlInput
            control={control}
            size="sm"
            type="number"
            label="Amount"
            placeholder="Amount"
            name="amount"
          />

          <ControlInput
            control={control}
            size="sm"
            label="Note (optional)"
            placeholder="Note"
            name="note"
          />

          <div className="col-span-3"></div>
          <div className="col-span-9">
            <Button
              type="submit"
              color="dark"
              size="size-2"
              loading={isLoading}
              disabled={!isValid}
            >
              {isLoading ? "Submitting" : "Record Entry"}
            </Button>
          </div>
        </form>
      </Panel>
    </>
  );
};

export default CashLedgerManualEntry;