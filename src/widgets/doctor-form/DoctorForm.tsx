// features/user-form/UserForm.tsx

import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { XRayDoctorPayload } from "@/entities/admin/users/model/schema";
import { AdminDoctorMultiSelect, Editor, ImageUpload } from "@/features";
import { ControlInput, ControlledSelect, Text } from "@/shared/ui";
import { RoleEnum } from "@/shared/utils/types/types";
import { StatusEnum } from "@/shared/utils/types/userTypes";

interface UserFormProps {
  resetCount?: number;
  isEdit?: boolean;
}

const UserForm = ({ resetCount = 0, isEdit }: UserFormProps) => {
  const { control, reset, watch } = useFormContext<XRayDoctorPayload>();
  // const form = useFormContext<XRayDoctorPayload>();
  useEffect(() => {
    if (resetCount > 0) {
      reset();
    }
  }, [resetCount, reset]);
  const image = watch("image");
  console.log(image);
  return (
    <div className="grid grid-cols-12 gap-y-4 items-center">
      {/* Image Upload */}
      <ImageUpload
        key={resetCount}
        control={control}
        name="image"
        directory="signature"
      />

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
      {!isEdit && (
        <ControlInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter password"
        />
      )}

      <ControlInput
        control={control}
        name="mobile"
        label="Mobile"
        placeholder="Enter mobile number"
      />
      {/* <ControlInput
        control={control}
        name="address"
        label="Address"
        placeholder="Enter address"
      /> */}
      <div className="col-span-3">
        <Text element="label" className="font-semibold">
          Address
        </Text>
      </div>
      <div className="col-span-9">
        <Controller
          control={control}
          name="address"
          render={({ field }) => {
            return (
              <div className="col-span-12 block">
                <Editor
                  label={<Text fontWeight="medium"></Text>}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            );
          }}
        />
      </div>

      {/* Prices */}
      <ControlInput control={control} name="single" label="Single Price" />
      <ControlInput control={control} name="double" label="Double Price" />
      <ControlInput control={control} name="multiple" label="Multiple Price" />
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
      <AdminDoctorMultiSelect
        label="Selected Doctors (IDs)"
        name="selected_dr"
        control={control}
      />
      <AdminDoctorMultiSelect
        label="Ignored Doctors (IDs)"
        name="ignored_dr"
        control={control}
      />

      {/* Submit */}
    </div>
  );
};

export default UserForm;
