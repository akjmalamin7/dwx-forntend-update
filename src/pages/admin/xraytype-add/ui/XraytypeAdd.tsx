import { Panel, PanelHeading } from "@/shared/ui";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { type XrayTypeFormValues } from "./xraytypeAdd.types";
import { useAddXraytypeMutation } from "@/shared/redux/features/admin/xraytype-add/addXraytypeApi";
import { XraytypeForm } from "@/entities/xraytype-form";

const XraytypeAdd = () => {
  const [resetCount, setResetCount] = useState<number>(0);
  const [createXraytype, { isLoading }] = useAddXraytypeMutation();

  const onSubmit: SubmitHandler<XrayTypeFormValues> = async (data) => {
    try {
      await createXraytype(data).unwrap();
      setResetCount((prev) => prev + 1);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating xray type:", e.data?.message || e.message);
      } else {
        console.error("Error creating xray type:", String(err));
      }
    }
  };

  return (
    <Panel
      header={
        <PanelHeading
          title="Add Xray type"
          button="Xray Type List"
          path="/admin/xraytype-list"
        />
      }
    >
      <XraytypeForm
        onSubmit={onSubmit}
        resetCount={resetCount}
        isLoading={isLoading}
        key={resetCount}
      />
    </Panel>
  );
};

export default XraytypeAdd;
