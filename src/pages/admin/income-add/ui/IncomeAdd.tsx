import { useCreateIncomeMutation } from "@/shared/redux/features/admin/income/incomeApi";
import { usePageTitle } from "@/shared/hooks";
import { Panel, PanelHeading } from "@/shared/ui";
import { type IncomeFormValues } from "@/shared/utils/types/types";
import { normalizeMonth } from "@/shared/utils/month";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast"; 
import IncomeForm from "@/widgets/income-form/IncomeForm";

const AddIncome = () => {
  const [createIncome, { isLoading }] = useCreateIncomeMutation();
  const [resetCount, setResetCount] = useState<number>(0);

  const onSubmit: SubmitHandler<IncomeFormValues> = async (data) => {
    const finalData = {
      ...data,
      month: normalizeMonth(data.month),
    };

    try {
      await createIncome(finalData).unwrap();
      setResetCount((prev) => prev + 1);

      toast.success("Income added successfully!", {
        duration: 2000,
        position: "top-right",
      });
    } catch (err: unknown) {
      console.error("Error creating income:", err);

      toast.error("Failed to add income. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  usePageTitle("Add Income", {
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
            title="Income Add"
            button="Income List"
            path="/admin/income-list"
          />
        }
        size="md"
      >
        <IncomeForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          resetCount={resetCount}
        />
      </Panel>
    </>
  );
};

export default AddIncome;