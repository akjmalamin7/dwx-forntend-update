// features/user-form/UserForm.tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  FormProvider,
  useForm,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

import {
  Button,
  ControlInput,
  ControlledSelect,
} from "@/shared/ui";

import { ImageUpload } from "@/features";
import {
  RoleEnum,
  StatusEnum,
  userFormSchema,
  type UserFormValues,
} from "@/shared/utils/types/userTypes";

interface UserFormProps {
  onSubmit: SubmitHandler<UserFormValues>;
  isLoading?: boolean;
  defaultValues?: Partial<UserFormValues>;
  isEdit?: boolean;
  resetCount?: number;
}

// Export form methods for parent component access
export type UserFormMethods = UseFormReturn<UserFormValues>;

const UserForm = ({
  onSubmit,
  isLoading = false,
  defaultValues,
  isEdit = false,
  resetCount = 0,
}: UserFormProps) => {
  const methods = useForm<UserFormValues>({
    mode: "onChange",
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: "user",
      status: "active",
      address: "",
      single: 0,
      double: 0,
      multiple: 0,
      ecg: 0,
      is_default: "No",
      hide_bill: "No",
      soft_delete: "No",
      selected_dr: [],
      ignored_dr: [],
      image: null,
      ...defaultValues,
    },
  });

  const {
    control,
    reset,
    formState: { isValid },
  } = methods;

  // ✅ Reset for edit
  useEffect(() => {
    if (isEdit && defaultValues) {
      methods.reset({
        ...methods.getValues(),
        ...defaultValues,
      });
    }
  }, [isEdit, defaultValues, methods]);

  // ✅ Reset for add mode (clear form)
  useEffect(() => {
    if (resetCount > 0 && !isEdit) {
      reset();
    }
  }, [resetCount, reset, isEdit]);

  const handleSubmit: SubmitHandler<UserFormValues> = async (data) => {
    try {
      console.log(data);
      await onSubmit(data);
    } catch (err) {
      console.error("Error submitting user form:", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-12 gap-y-4 items-center"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        {/* Image Upload */}
        <ImageUpload key={resetCount} control={control} name="image" />

        {/* Role */}
        <ControlledSelect
          label="User Role"
          control={control}
          name="role"
          options={Object.values(RoleEnum).map((r) => ({
            name: r,
            value: r,
          }))}
        />

        {/* Basic Info */}
        <ControlInput
          control={control}
          name="name"
          label="Full Name"
          placeholder="Enter name"
        />
        <ControlInput
          control={control}
          name="email"
          label="Email/Username"
          placeholder="Enter Username"
        />

        <ControlInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter password"
        />


        <ControlInput
          control={control}
          name="mobile"
          label="Mobile"
          placeholder="Enter mobile number"
        />


        <ControlInput
          control={control}
          name="address"
          label="Address"
          placeholder="Enter address"
        />





        {/* Prices */}
        <ControlInput
          control={control}
          name="single"
          label="Single Price"
        />
        <ControlInput
          control={control}
          name="double"
          label="Double Price"
        />
        <ControlInput
          control={control}
          name="multiple"
          label="Multiple Price"
        />

        <ControlInput control={control} name="ecg" label="ECG Price" />

        {/* Flags */}
        <ControlledSelect
          label="Default Upload?"
          control={control}
          name="is_default"
          options={[
            { name: "Yes", value: "Yes" },
            { name: "No", value: "No" },
          ]}
        />

        <ControlledSelect
          label="Hide Bill?"
          control={control}
          name="hide_bill"
          options={[
            { name: "Yes", value: "Yes" },
            { name: "No", value: "No" },
          ]}
        />

        {/* Status */}
        <ControlledSelect
          label="Status"
          control={control}
          name="status"
          options={Object.values(StatusEnum).map((s) => ({
            name: s,
            value: s,
          }))}
        />

        {/* Selected / Ignored Doctors */}
        <ControlInput
          control={control}
          name="selected_dr"
          label="Selected Doctors (IDs)"
          placeholder="Comma separated IDs"
        />

        <ControlInput
          control={control}
          name="ignored_dr"
          label="Ignored Doctors (IDs)"
          placeholder="Comma separated IDs"
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
            {isLoading ? "Submitting" : isEdit ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserForm;
