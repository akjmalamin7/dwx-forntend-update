import {
  useGetExpenseByIdQuery,
  useUpdateExpenseMutation,
} from "@/shared/redux/features/admin/expence/expenceApi";
import { usePageTitle } from "@/shared/hooks";
import { Loader, Panel, PanelHeading } from "@/shared/ui";
import { type ExpenseFormValues } from "@/shared/utils/types/types"; 
import { type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ExpenseForm } from "@/widgets/expense-form";
import { normalizeMonth, padMonth } from "@/shared/utils/month";

const UpdateExpense = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: expense, isLoading: isFetching } = useGetExpenseByIdQuery(
    id as string,
    { skip: !id }
  );

  const [updateExpense, { isLoading: isUpdating }] =
    useUpdateExpenseMutation();

  usePageTitle("Update Expense", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const onSubmit: SubmitHandler<ExpenseFormValues> = async (data) => {
    if (!id) return;

    const finalData = {
      id,
      ...data,
      month: normalizeMonth(data.month),
    };

    try {
      await updateExpense(finalData).unwrap();

      toast.success("Expense updated successfully!", {
        duration: 2000,
        position: "top-right",
      });

      navigate("/admin/expence-list");
    } catch (err: unknown) {
      console.error("Error updating expense:", err);

      toast.error("Failed to update expense. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  if (isFetching) return <Loader />;

  const defaultValues: Partial<ExpenseFormValues> = {
    category_id: expense?.data?.category_id?._id || "",
    title: expense?.data?.title || "",
    amount: expense?.data?.amount ?? 0,
    month: padMonth(expense?.data?.month || ""),
    note: expense?.data?.note || "",
    date: expense?.data?.date ? expense.data.date.substring(0, 10) : "",
  };

  return (
    <>
      <Toaster />
      <Panel
        header={
          <PanelHeading
            title="Update Expense"
            button="Expense List"
            path="admin/expence-list"
          />
        }
      >
        <ExpenseForm
          onSubmit={onSubmit}
          isLoading={isUpdating}
          isEdit
          defaultValues={defaultValues}
        />
      </Panel>
    </>
  );
};

export default UpdateExpense;