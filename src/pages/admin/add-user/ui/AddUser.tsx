import { usePageTitle } from "@/shared/hooks";
import { useAddUserMutation } from "@/shared/redux/features/admin/add-user/addUserApi";
import { ADD_ADMIN_USER_SCHEMA } from "@/shared/redux/features/admin/add-user/user.types";
import { Button, Panel, PanelHeading } from "@/shared/ui";

import { DoctorForm } from "@/widgets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
      status: "Inactive",
      hide_bill: "No",
      role: "xray_dr",
      image: null,
      selected_dr: [],
      ignored_dr: [],
    },
    mode: "onChange",
  });
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createUser(data).unwrap();
      setResetCount((prev) => prev + 1);
      form.reset();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  });

    usePageTitle("Add New user", {
          prefix: "DWX - ",
          defaultTitle: "DWX",
          restoreOnUnmount: true,
        });

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
        <DoctorForm resetCount={resetCount} />
      </FormProvider>
      {/* submit */}
      <div className="grid grid-cols-12 gap-y-4 items-center mt-4">
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <Button
            onClick={onSubmit}
            type="submit"
            color="dark"
            size="size-2"
            loading={isLoading}
          >
            {isLoading ? "Submitting" : "Create User"}
          </Button>
        </div>
      </div>
    </Panel>
  );
};

export default AddUser;
