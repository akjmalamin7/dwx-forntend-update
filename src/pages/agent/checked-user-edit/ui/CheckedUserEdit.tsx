import { CheckedUserForm } from "@/entities";
import type { CheckedUserFormValues } from "@/shared/redux/features/agent/checked-user-add/AddCheckedUser.types";
import { useEditCheckedUserMutation } from "@/shared/redux/features/agent/checked-user-add/AddCheckedUserApi";
import { useGetCheckeduserQuery } from "@/shared/redux/features/agent/checked-user-list/checkedUserListApi";
import { Panel, PanelHeading } from "@/shared/ui";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";

const CheckedUserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [resetCount, setResetCount] = useState<number>(0);
  const [editCheckedUser, { isLoading: isUpdateLoading }] =
    useEditCheckedUserMutation();
  const {
    data: checkedUser,
    isLoading: isViewLoading,
    isError,
  } = useGetCheckeduserQuery(id!, { skip: !id });

  const transformCheckedUser = (
    data: typeof checkedUser
  ): Partial<CheckedUserFormValues> => {
    if (!data) return {};

    return {
      name: data.name || "",
      details: data.details || "",
    };
  };
  const defaultValues = transformCheckedUser(checkedUser);

  const onSubmit: SubmitHandler<CheckedUserFormValues> = async (data) => {
    try {
      await editCheckedUser({ id, data }).unwrap();
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
  const isLoading = isUpdateLoading || isViewLoading;
  if (isViewLoading) {
    return (
      <Panel
        header={
          <PanelHeading
            title="Edit X-ray Report"
            button="Patient List"
            path="agent/patient/completed"
          />
        }
      >
        <div className="flex justify-center items-center py-8">
          Loading patient data...
        </div>
      </Panel>
    );
  }

  if (isError) {
    return (
      <Panel
        header={
          <PanelHeading
            title="Edit X-ray Report"
            button="Patient List"
            path="agent/patient/completed"
          />
        }
      >
        <div className="flex justify-center items-center py-8 text-red-500">
          Error loading patient data. Please try again.
        </div>
      </Panel>
    );
  }
  return (
    <Panel
      header={
        <PanelHeading
          title="Edit Checked User"
          button="Checked User List"
          path="/agent/checked-user-list"
        />
      }
    >
      <CheckedUserForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        resetCount={resetCount}
        isEdit
        defaultValues={defaultValues}
      />
    </Panel>
  );
};

export default CheckedUserEdit;
