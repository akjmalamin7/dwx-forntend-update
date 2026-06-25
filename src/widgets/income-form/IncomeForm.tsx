// features/income-form/IncomeForm.tsx
import { Button, ControlInput, ControlledSelect } from "@/shared/ui";
import {
  incomeFormSchema,
  type IncomeFormValues,
} from "@/shared/utils/types/types";
import { useGetIncomeCategoryListQuery } from "@/shared/redux/features/admin/income/incomeApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import {
  FormProvider,
  useForm,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

interface IncomeFormProps {
  onSubmit: SubmitHandler<IncomeFormValues>;
  isLoading?: boolean;
  defaultValues?: Partial<IncomeFormValues>;
  isEdit?: boolean;
  resetCount?: number;
}

export type IncomeFormMethods = UseFormReturn<IncomeFormValues>;

const IncomeForm = ({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  resetCount = 0,
}: IncomeFormProps) => {
  const { data: categories } =
    useGetIncomeCategoryListQuery();

  const methods = useForm<IncomeFormValues>({
    mode: "onChange",
    resolver: yupResolver(incomeFormSchema),
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

  const handleSubmit: SubmitHandler<IncomeFormValues> = async (data) => {
    try {
      await onSubmit(data);
    } catch (err: unknown) {
      console.error("Error submitting income:", err);
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
          placeholder="e.g. May Patient Fees - Karim"
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

export default IncomeForm;