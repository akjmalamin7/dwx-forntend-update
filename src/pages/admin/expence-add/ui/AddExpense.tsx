import { useCreateExpenseMutation } from "@/shared/redux/features/admin/expence/expenceApi";
import { usePageTitle } from "@/shared/hooks";
import { Panel, PanelHeading } from "@/shared/ui";
import { type ExpenseFormValues } from "@/shared/utils/types/types";
 
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ExpenseForm } from "@/widgets/expense-form";
import { normalizeMonth } from "@/shared/utils/month";

const AddExpense = () => {
  const [createExpense, { isLoading }] = useCreateExpenseMutation();
  const [resetCount, setResetCount] = useState<number>(0);

  const onSubmit: SubmitHandler<ExpenseFormValues> = async (data) => {
    const finalData = {
      ...data,
      status: "Paid",
      month: normalizeMonth(data.month),
    };

    try {
      await createExpense(finalData).unwrap();
      setResetCount((prev) => prev + 1);

      toast.success("Expense added successfully!", {
        duration: 2000,
        position: "top-right",
      });
    } catch (err: unknown) {
      console.error("Error creating expense:", err);

      toast.error("Failed to add expense. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  usePageTitle("Add Expense", {
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
            title="Expense Add"
            button="Expense List"
            path="/admin/expence-list"
          />
        }
        size="md"
      >
        <ExpenseForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          resetCount={resetCount}
        />
      </Panel>
    </>
  );
};

export default AddExpense;