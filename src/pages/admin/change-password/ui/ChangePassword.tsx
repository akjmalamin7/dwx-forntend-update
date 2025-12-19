import { useChangePasswordMutation } from "@/entities/admin/users/api/mutation";
import { CHANGE_PASSWORD_SCHEMA } from "@/entities/admin/users/model/schema";
import { usePageTitle } from "@/shared/hooks";
import { Button, ControlInput, Panel, PanelHeading } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const { id } = useParams<{ id: string }>();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const form = useForm({
    resolver: yupResolver(CHANGE_PASSWORD_SCHEMA),
    defaultValues: {
      _id: "",
      password: "",
    },
  });
  const {
    control,
    formState: { isDirty },
  } = form;
  const handleSubmit = form.handleSubmit(async (value) => {
    try {
      const formData = {
        ...value,
        id: id,
      };
      await changePassword(formData).unwrap();
      form.reset();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  });

  usePageTitle("Change Password", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel
      header={
        <PanelHeading
          title="Change password"
          button="User List"
          path="admin/users/doctor"
        />
      }
    >
      <FormProvider {...form}>
        <div className="grid grid-cols-12 gap-y-4 items-center">
          <ControlInput
            control={control}
            name="password"
            label="password"
            placeholder="Enter Password"
          />
        </div>
      </FormProvider>
      {/* submit */}
      <div className="grid grid-cols-12 gap-y-4 items-center mt-4">
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <Button
            onClick={handleSubmit}
            type="submit"
            color="dark"
            size="size-2"
            disabled={!isDirty}
            loading={isLoading}
          >
            {isLoading ? "Submitting" : "Create User"}
          </Button>
        </div>
      </div>
    </Panel>
  );
};

export default ChangePassword;
