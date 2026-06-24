// features/expense-form/ExpenseForm.tsx
import { Button, ControlInput, ControlledSelect } from "@/shared/ui";
import {
  expenseFormSchema,
  type ExpenseFormValues,
} from "@/shared/utils/types/types";
import { useGetExpenseCategoryListQuery } from "@/shared/redux/features/admin/expence/expenceApi";

import { useEffect, useRef } from "react";
import {
  FormProvider,
  useForm,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface ExpenseFormProps {
  onSubmit: SubmitHandler<ExpenseFormValues>;
  isLoading?: boolean;
  defaultValues?: Partial<ExpenseFormValues>;
  isEdit?: boolean;
  resetCount?: number;
}

export type ExpenseFormMethods = UseFormReturn<ExpenseFormValues>;

const ExpenseForm = ({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  resetCount = 0,
}: ExpenseFormProps) => {
  const { data: categories } =
    useGetExpenseCategoryListQuery();

  const methods = useForm<ExpenseFormValues>({
    mode: "onChange",
    resolver: yupResolver(expenseFormSchema),
    defaultValues: {
      category_id: "",
      title: "",
      amount: 0,
      month: "",
      note: "",
      date: "",
      ...defaultValues,
    },
  });

  const {
    control,
    reset,
    formState: { isValid },
  } = methods;

  const hasReset = useRef(false);

  // Edit mode: fill form once defaultValues arrive
  useEffect(() => {
    if (isEdit && defaultValues && !hasReset.current) {
      const hasData = Object.values(defaultValues).some(
        (val) => val !== "" && val !== undefined
      );
      if (!hasData) return;

      hasReset.current = true;
      reset({
        category_id: defaultValues.category_id || "",
        title: defaultValues.title || "",
        amount: defaultValues.amount ?? 0,
        month: defaultValues.month || "",
        note: defaultValues.note || "",
        date: defaultValues.date || "",
      });
    }
  }, [isEdit, defaultValues, reset]);

  // Add mode: reset after successful submit
  useEffect(() => {
    if (resetCount > 0 && !isEdit) {
      reset({
        category_id: "",
        title: "",
        amount: 0,
        month: "",
        note: "",
        date: "",
      });
    }
  }, [resetCount, reset, isEdit]);

  const handleSubmit: SubmitHandler<ExpenseFormValues> = async (data) => {
    try {
      await onSubmit(data);
    } catch (err: unknown) {
      console.error("Error submitting expense:", err);
    }
  };

  const categoryOptions =
    categories?.map((cat) => ({ name: cat.name, value: cat.id })) || [];

  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-12 gap-y-4 items-center"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        {/* Category */}
        <ControlledSelect
          label="Category"
          control={control}
          name="category_id"
          options={categoryOptions} 
        />

        {/* Title */}
        <ControlInput
          control={control}
          size="sm"
          label="Title"
          placeholder="e.g. March Internet Bill - Karim"
          name="title"
        />

        {/* Amount */}
        <ControlInput
          control={control}
          size="sm"
          type="number"
          label="Amount"
          placeholder="Amount"
          name="amount"
        />

        {/* Month */}
        <ControlInput
          control={control}
          size="sm"
          type="month"
          label="Month"
          placeholder="Select Month"
          name="month"
        />

        {/* Date (optional) */}
        <ControlInput
          control={control}
          size="sm" 
          label="Date (optional)"
          placeholder="Select Date"
          name="date"
        />

        {/* Note */}
        <ControlInput
          control={control}
          size="sm"
          label="Note (optional)"
          placeholder="Note"
          name="note"
        />

        {/* Submit */}
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <Button
            type="submit"
            color="dark"
            size="size-2"
            loading={isLoading}
            disabled={!isValid}
          >
            {isLoading ? "Submitting" : isEdit ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ExpenseForm;