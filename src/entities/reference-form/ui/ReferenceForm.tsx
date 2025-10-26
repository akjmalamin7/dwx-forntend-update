import {
  ReferenceFormschema,
  type ReferenceFormValues,
} from "@/pages/agent/reference-add/ui/referenceAdd.types";
import { Button, ControlInput } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

interface IProps {
  onSubmit: SubmitHandler<ReferenceFormValues>;
  isLoading?: boolean;
  defaultValues?: Partial<ReferenceFormValues>;
  isEdit?: boolean;
  resetCount?: number;
}

const ReferenceForm = ({
  onSubmit,
  isLoading,
  defaultValues,
  isEdit = false,
  resetCount = 0,
}: IProps) => {
  const methods = useForm<ReferenceFormValues>({
    mode: "onChange",
    resolver: yupResolver(ReferenceFormschema),
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

  const handleSubmit: SubmitHandler<ReferenceFormValues> = async (data) => {
    try {
      await onSubmit(data);
      if (!isEdit) {
        reset();
      }
    } catch (err: unknown) {
      console.error("Error creating Reference", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-12 gap-y-4 items-center pt-5 pb-5"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <ControlInput
          control={control}
          size="sm"
          label="Reference Doctor Name"
          placeholder="Reference Doctor Name"
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

export default ReferenceForm;
