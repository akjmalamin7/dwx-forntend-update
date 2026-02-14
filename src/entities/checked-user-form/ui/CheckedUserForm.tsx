import { Editor } from "@/features";
import {
  CheckedUserFormschema,
  type CheckedUserFormValues,
} from "@/shared/redux/features/agent/checked-user-add/AddCheckedUser.types";
import { Button, ControlInput, Text } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
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
    formState: {   },
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
    console.log(data);
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

        <Controller
          control={control}
          name="details"
          render={({ field }) => {
            return (
              <div className="col-span-12 block">
                <Editor
                  label={<Text fontWeight="medium">User Designation</Text>}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            );
          }}
        />
        {/* Submit */}
        <div className="col-span-12">
          <Button
            color="dark"
            size="size-2"
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            loading={isLoading} 
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CheckedUserForm;
