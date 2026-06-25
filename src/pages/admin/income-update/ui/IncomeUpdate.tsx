import {
  useGetIncomeByIdQuery,
  useUpdateIncomeMutation,
} from "@/shared/redux/features/admin/income/incomeApi";
import { usePageTitle } from "@/shared/hooks";
import { Loader, Panel, PanelHeading } from "@/shared/ui";
import { type IncomeFormValues } from "@/shared/utils/types/types";
import { normalizeMonth, padMonth } from "@/shared/utils/month";
import { type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; 
import IncomeForm from "@/widgets/income-form/IncomeForm";

const IncomeUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: income, isLoading: isFetching } = useGetIncomeByIdQuery(
    id as string,
    { skip: !id }
  );

  const [updateIncome, { isLoading: isUpdating }] = useUpdateIncomeMutation();

  usePageTitle("Update Income", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const onSubmit: SubmitHandler<IncomeFormValues> = async (data) => {
    if (!id) return;

    const finalData = {
      id,
      ...data,
      month: normalizeMonth(data.month),
    };

    try {
      await updateIncome(finalData).unwrap();

      toast.success("Income updated successfully!", {
        duration: 2000,
        position: "top-right",
      });

      navigate("/admin/income-list");
    } catch (err: unknown) {
      console.error("Error updating income:", err);

      toast.error("Failed to update income. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  if (isFetching) return <Loader />;

  const defaultValues: Partial<IncomeFormValues> = {
    category_id: income?.data?.category_id?._id || "",
    title: income?.data?.title || "",
    amount: income?.data?.amount ?? 0,
    month: padMonth(income?.data?.month || ""),
    note: income?.data?.note || "",
    date: income?.data?.date ? income.data.date.substring(0, 10) : "",
  };

  return (
    <>
      <Toaster />
      <Panel
        header={
          <PanelHeading
            title="Update Income"
            button="Income List"
            path="/admin/income-list"
          />
        }
      >
        <IncomeForm
          onSubmit={onSubmit}
          isLoading={isUpdating}
          isEdit
          defaultValues={defaultValues}
        />
      </Panel>
    </>
  );
};

export default IncomeUpdate;