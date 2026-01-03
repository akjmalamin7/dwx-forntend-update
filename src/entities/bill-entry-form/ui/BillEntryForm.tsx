 
import { HistoryFormschema, type HistoryFormValues } from "@/pages/admin/history-add/ui/historyAdd.types"; 
import { Button, ControlInput, ControlledSelect } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

interface IProps {
  onSubmit: SubmitHandler<HistoryFormValues>;
  isLoading?: boolean;
  defaultValues?: Partial<HistoryFormValues>;
  isEdit?: boolean;
  resetCount?: number;
}

const BillEntryForm = ({
  onSubmit,
  isLoading,
  defaultValues,
  isEdit = false,
  resetCount = 0,
}: IProps) => {
  const methods = useForm<HistoryFormValues>({
    mode: "onChange",
    resolver: yupResolver(HistoryFormschema),
    defaultValues: {
      name: "",
      ...defaultValues,
    },
  });

  const {
    control,
    reset,
    formState: { isValid },
  } = methods;

  // Reset form when defaultValues change (for edit mode)
  useEffect(() => {
    if (defaultValues && isEdit) {
      reset({
        name: defaultValues.name || "",
      });
    }
  }, [defaultValues, isEdit, reset]);

  useEffect(() => {
    if (resetCount > 0 && !isEdit) {
      reset({
        name: "",
      });
    }
  }, [isEdit, resetCount, reset]);

  const handleSubmit: SubmitHandler<HistoryFormValues> = async (data) => {
    try {
      await onSubmit(data);
      if (!isEdit) {
        reset();
      }
    } catch (err: unknown) {
      console.error("Error creating  History", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className=" w-full flex flex-col gap-4 pt-5 pb-5"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
 
  <ControlledSelect
            control={control}
            name="user_id"
            label="User"
            isInputLabel={false}
            options={[
              { name: "User 1", value: "user1" },
              { name: "User 2", value: "user2" },
            ]}
          />
 
        <ControlInput
          control={control}
          size="sm"
          label="Month"
          placeholder="Month"
          name="name"
        />

         <ControlInput
          control={control}
          size="sm"
          label="Total Single"
          placeholder="0"
          name="name"
        />

         <ControlInput
          control={control}
          size="sm"
          label="Total Double"
          placeholder="0"
          name="name"
        />
         <ControlInput
          control={control}
          size="sm"
          label="Total Multiple"
          placeholder="0"
          name="name"
        />
         <ControlInput
          control={control}
          size="sm"
          label="Total Ecg"
          placeholder="0"
          name="name"
        />
        {/* Submit */}
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <Button
            color="dark"
            size="size-2"
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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

export default BillEntryForm;
