 
import { SoftwareFormschema, type SoftwareFormValues } from "@/pages/admin/software-add/ui/softwareAdd.types"; 
import { Button, ControlInput } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

interface IProps {
  onSubmit: SubmitHandler<SoftwareFormValues>;
  isLoading?: boolean;
  defaultValues?: Partial<SoftwareFormValues>;
  isEdit?: boolean;
  resetCount?: number;
}

const SoftwareForm = ({
  onSubmit,
  isLoading,
  defaultValues,
  isEdit = false,
  resetCount = 0,
}: IProps) => {
  const methods = useForm<SoftwareFormValues>({
    mode: "onChange",
    resolver: yupResolver(SoftwareFormschema),
    defaultValues: {
      title: "",
      url: "",
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
        title: defaultValues.title || "",
        url: defaultValues.url || "",
      });
    }
  }, [defaultValues, isEdit, reset]);

  useEffect(() => {
    if (resetCount > 0 && !isEdit) {
      reset({
        title: "",
        url: "",
      });
    }
  }, [isEdit, resetCount, reset]);

  const handleSubmit: SubmitHandler<SoftwareFormValues> = async (data) => {
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
          label="Software Name"
          placeholder="Software Name"
          name="title"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Software URL"
          placeholder="Software URL"
          name="url"
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

export default SoftwareForm;
