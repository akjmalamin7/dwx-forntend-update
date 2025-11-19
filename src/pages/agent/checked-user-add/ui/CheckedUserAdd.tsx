import { CheckedUserForm } from "@/entities";
import { usePageTitle } from "@/shared/hooks";
import { type CheckedUserFormValues } from "@/shared/redux/features/agent/checked-user-add/AddCheckedUser.types";
import { useAddCheckedUserMutation } from "@/shared/redux/features/agent/checked-user-add/AddCheckedUserApi";
import { Panel, PanelHeading } from "@/shared/ui";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";

const CheckedUserAdd = () => {
  const [resetCount, setResetCount] = useState<number>(0);
  const [createCheckedUser, { isLoading }] = useAddCheckedUserMutation();

  const onSubmit: SubmitHandler<CheckedUserFormValues> = async (data) => {
    try {
      await createCheckedUser(data).unwrap();
      setResetCount((prev) => prev + 1);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating patient:", e.data?.message || e.message);
      } else {
        console.error("Error creating patient:", String(err));
      }
    }
  };

  usePageTitle("Add New Checked User", {
      prefix: "DWX - ",
      defaultTitle: "DWX",
      restoreOnUnmount: true,
    });

  return (
    <Panel
      header={
        <PanelHeading
          title="Add New Checked User"
          button="Checked User List"
          path="/agent/checked-user-list"
        />
      }
    >
      <CheckedUserForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        resetCount={resetCount}
      />
    </Panel>
  );
};

export default CheckedUserAdd;
