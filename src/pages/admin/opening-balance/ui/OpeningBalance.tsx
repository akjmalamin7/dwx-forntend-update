import { usePageTitle } from "@/shared/hooks";
import { useGetOpeningBalanceQuery, useSetOpeningBalanceMutation, useUpdateOpeningBalanceMutation } from "@/shared/redux/features/admin/cash-ledger/cashLedgerApi";
import { Button, ControlInput, Panel, PanelHeading } from "@/shared/ui";
import {
  openingBalanceSchema,
  type OpeningBalanceFormValues,
} from "@/shared/utils/types/types"; 
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const OpeningBalance = () => {
  const { data: openingBalance, isLoading: isFetching } =
    useGetOpeningBalanceQuery();

  const [setOpeningBalance, { isLoading: isSetting }] =
    useSetOpeningBalanceMutation();
  const [updateOpeningBalance, { isLoading: isUpdating }] =
    useUpdateOpeningBalanceMutation();

  const isEdit = !!openingBalance?.data;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<OpeningBalanceFormValues>({
    mode: "onChange",
    resolver: yupResolver(openingBalanceSchema),
    defaultValues: {
      amount: 0,
      note: "",
    },
  });

  useEffect(() => {
    if (openingBalance?.data) {
      reset({
        amount: openingBalance.data.amount,
        note: openingBalance.data.note || "",
      });
    }
  }, [openingBalance, reset]);

  const onSubmit: SubmitHandler<OpeningBalanceFormValues> = async (data) => {
    try {
      if (isEdit) {
        await updateOpeningBalance(data).unwrap();
        toast.success("Opening balance updated!", {
          duration: 2000,
          position: "top-right",
        });
      } else {
        await setOpeningBalance(data).unwrap();
        toast.success("Opening balance set!", {
          duration: 2000,
          position: "top-right",
        });
      }
    } catch (err: unknown) {
      console.error("Error saving opening balance:", err);
      toast.error("Failed to save opening balance. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  usePageTitle("Opening Balance", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  if (isFetching) {
    return (
      <Panel header="Opening Balance" size="md">
        <div className="text-center py-10 text-gray-400">Loading...</div>
      </Panel>
    );
  }

  return (
    <>
      <Toaster />
      <Panel
        header={
          <PanelHeading
            title="Opening Balance"
            button="Cash Ledger History"
            path="/admin/cash-ledger/history"
          />
        }
        size="md"
      >
        {isEdit && (
          <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-700">
            Opening balance is already set. Saving will update the existing
            value.
          </div>
        )}

        <form
          className="grid grid-cols-12 gap-y-4 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ControlInput
            control={control}
            size="sm"
            type="number"
            label="Opening Balance"
            placeholder="Amount"
            name="amount"
          />

          <ControlInput
            control={control}
            size="sm"
            label="Note (optional)"
            placeholder="e.g. Starting balance as of June 2026"
            name="note"
          />

          <div className="col-span-3"></div>
          <div className="col-span-9">
            <Button
              type="submit"
              color="dark"
              size="size-2"
              loading={isSetting || isUpdating}
              disabled={!isValid}
            >
              {isSetting || isUpdating
                ? "Saving"
                : isEdit
                ? "Update Opening Balance"
                : "Set Opening Balance"}
            </Button>
          </div>
        </form>
      </Panel>
    </>
  );
};

export default OpeningBalance;