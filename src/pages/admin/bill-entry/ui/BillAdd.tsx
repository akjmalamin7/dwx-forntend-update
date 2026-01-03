import { Panel, PanelHeading } from "@/shared/ui";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { type HistoryFormValues } from "./billAdd.types";
import { useAddHistoryMutation } from "@/shared/redux/features/admin/history-add/addHistoryApi";  
import { usePageTitle } from "@/shared/hooks";
import { BillEntryForm } from "@/entities/bill-entry-form";

const BillAdd = () => {
  const [resetCount, setResetCount] = useState<number>(0);
  const [createHistory, { isLoading }] = useAddHistoryMutation();

  const onSubmit: SubmitHandler<HistoryFormValues> = async (data) => {
    try {
      await createHistory(data).unwrap();
      setResetCount((prev) => prev + 1);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating history:", e.data?.message || e.message);
      } else {
        console.error("Error creating history:", String(err));
      }
    }
  };

  usePageTitle("Add Bill", {
        prefix: "DWX - ",
        defaultTitle: "DWX",
        restoreOnUnmount: true,
      });

  return (
    <Panel
      header={
        <PanelHeading
          title="Bill Entry"
          button=" "
          path=""
        />
      }
    >
      <BillEntryForm
        onSubmit={onSubmit}
        resetCount={resetCount}
        isLoading={isLoading}
        key={resetCount}
      />
    </Panel>
  );
};

export default BillAdd;
