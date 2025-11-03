import { useAddUserMutation } from "@/shared/redux/features/admin/add-user/addUserApi";
import { Panel, PanelHeading } from "@/shared/ui";
import {
  ADD_ADMIN_USER_SCHEMA,
  type XRayDoctorPayload,
} from "@/shared/utils/types/userTypes";
import { DoctorForm } from "@/widgets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

const AddUser = () => {
  const [createUser, { isLoading }] = useAddUserMutation();
  const [resetCount, setResetCount] = useState<number>(0);

  const form = useForm({
    resolver: yupResolver(ADD_ADMIN_USER_SCHEMA),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      address: "",
      single: undefined,
      double: undefined,
      multiple: undefined,
      ecg: undefined,
      is_default: "No",
      status: "inactive",
      hide_bill: "No",
      role: "xray_dr",
      image: null,
      selected_dr: [],
      ignored_dr: [],
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<XRayDoctorPayload> = async (data) => {
    try {
      await createUser(data).unwrap();
      setResetCount((prev) => prev + 1);
      form.reset();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <Panel
      header={
        <PanelHeading
          title="Add New User"
          button="User List"
          path="admin/users/doctor"
        />
      }
    >
      <FormProvider {...form}>
        <DoctorForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          resetCount={resetCount}
        />
      </FormProvider>
    </Panel>
  );
};

export default AddUser;
