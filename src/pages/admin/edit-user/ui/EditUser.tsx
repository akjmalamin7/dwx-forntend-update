import { usePageTitle } from "@/shared/hooks";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/shared/redux/features/admin/add-user/addUserApi";
import { ADD_ADMIN_USER_SCHEMA } from "@/shared/redux/features/admin/add-user/user.types";
import { Button, Panel, PanelHeading } from "@/shared/ui";
import { DoctorForm } from "@/widgets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery(id!, {
    skip: !id,
  });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [resetCount, setResetCount] = useState<number>(0);
  const userData = user?.data[0];
  const form = useForm({
    resolver: yupResolver(ADD_ADMIN_USER_SCHEMA),
    values: {
      name: userData?.name || "",
      email: userData?.email || "",
      password: "",
      mobile: userData?.name || "",
      address: userData?.address || "",
      single: userData?.single || 0,
      double: userData?.double || 0,
      multiple: userData?.multiple || 0,
      ecg: userData?.ecg || 0,
      is_default: userData?.is_default || "",
      status: userData?.status || "",
      hide_bill: userData?.hide_bill || "",
      role: userData?.role || "",
      image: userData?.image || null,
      selected_dr: userData?.selected_dr || [],
      ignored_dr: userData?.ignored_dr || [],
    },
    mode: "onChange",
  });
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await updateUser({ id, data }).unwrap();
      navigate("/admin/user-list");
      setResetCount((prev) => prev + 1);
    } catch (err) {
      console.error("Error creating user:", err);
    }
  });

  usePageTitle("Update  User", {
        prefix: "DWX - ",
        defaultTitle: "DWX",
        restoreOnUnmount: true,
      });
      
  return (
    <Panel
      header={
        <PanelHeading
          title="Update  User"
          button="User List"
          path="admin/users/doctor"
        />
      }
    >
      <FormProvider {...form}>
        <DoctorForm resetCount={resetCount} isEdit={true} />
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
            loading={isUpdating}
          >
            {isUpdating ? "Submitting" : "Create User"}
          </Button>
        </div>
      </div>
    </Panel>
  );
};

export default EditUser;
