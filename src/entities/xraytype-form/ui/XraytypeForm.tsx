 
import { XrayTypeFormschema, type XrayTypeFormValues } from "@/pages/admin/xraytype-add/ui/xraytypeAdd.types";
import { Button, ControlInput } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

interface IProps {
  onSubmit: SubmitHandler<XrayTypeFormValues>;
  isLoading?: boolean;
  defaultValues?: Partial<XrayTypeFormValues>;
  isEdit?: boolean;
  resetCount?: number;
}

const XraytypeForm = ({
  onSubmit,
  isLoading,
  defaultValues,
  isEdit = false,
  resetCount = 0,
}: IProps) => {
  const methods = useForm<XrayTypeFormValues>({
    mode: "onChange",
    resolver: yupResolver(XrayTypeFormschema),
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

  const handleSubmit: SubmitHandler<XrayTypeFormValues> = async (data) => {
    try {
      await onSubmit(data);
      if (!isEdit) {
        reset();
      }
    } catch (err: unknown) {
      console.error("Error creating Xray Type", err);
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
          label="Xray type Name"
          placeholder="Xray type Name"
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

export default XraytypeForm;
