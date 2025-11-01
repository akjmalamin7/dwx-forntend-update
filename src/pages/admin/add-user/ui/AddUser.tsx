import { useAddUserMutation } from "@/shared/redux/features/admin/add-user/addUserApi"; 
import { Panel, PanelHeading } from "@/shared/ui"; 
import type { UserFormValues } from "@/shared/utils/types/userTypes";
import { DoctorForm } from "@/widgets";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";

const AddUser = () => {
  const [createUser, { isLoading }] = useAddUserMutation();
  const [resetCount, setResetCount] = useState<number>(0);

  const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
   
    try {
      await createUser(data).unwrap();
      // Reset through resetCount prop
      setResetCount((prev) => prev + 1);
    } catch (err: unknown) {
      console.error("Error creating patient:", err);
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
      <DoctorForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        resetCount={resetCount}
      />
    </Panel>
  );
};

export default AddUser;
