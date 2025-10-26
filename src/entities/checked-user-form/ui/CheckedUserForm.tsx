import {
  CheckedUserFormschema,
  type CheckedUserFormValues,
} from "@/shared/redux/features/agent/checked-user-add/AddCheckedUser.types";
import { Button, ControlInput } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
interface IProps {
  onSubmit: SubmitHandler<CheckedUserFormValues>;
  isLoading?: boolean;
  defaultValues?: Partial<CheckedUserFormValues>;
  isEdit?: boolean;
  resetCount?: number;
}
const CheckedUserForm = ({
  onSubmit,
  isLoading,
  defaultValues,
  isEdit = false,
  resetCount = 0,
}: IProps) => {
  const methods = useForm<CheckedUserFormValues>({
    mode: "onChange",
    resolver: yupResolver(CheckedUserFormschema),
    defaultValues: {
      name: "",
      details: "",
      ...defaultValues,
    },
  });
  const {
    control,
    reset,
    formState: { isValid },
  } = methods;
  useEffect(() => {
    if (defaultValues && isEdit) {
      reset({
        name: defaultValues.name || "",
        details: defaultValues.details || "",
      });
    }
  }, [defaultValues, isEdit, reset]);
  useEffect(() => {
    if (resetCount > 0 && !isEdit) {
      reset({
        name: "",
        details: "",
      });
    }
  }, [isEdit, resetCount, reset]);

  const handleSubmit: SubmitHandler<CheckedUserFormValues> = async (data) => {
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
          label="Name"
          placeholder="Name"
          name="name"
        />
        <ControlInput
          control={control}
          size="sm"
          label="User Designation"
          placeholder="User Designation"
          name="details"
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
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CheckedUserForm;
