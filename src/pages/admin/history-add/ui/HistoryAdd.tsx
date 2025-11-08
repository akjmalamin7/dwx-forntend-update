import { Panel, PanelHeading } from "@/shared/ui";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { type HistoryFormValues } from "./historyAdd.types";
import { useAddHistoryMutation } from "@/shared/redux/features/admin/history-add/addHistoryApi"; 
import { HistoryForm } from "@/entities/history-from/ui";

const HistoryAdd = () => {
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

  return (
    <Panel
      header={
        <PanelHeading
          title="Add History"
          button="History List"
          path="/admin/history-list"
        />
      }
    >
      <HistoryForm
        onSubmit={onSubmit}
        resetCount={resetCount}
        isLoading={isLoading}
        key={resetCount}
      />
    </Panel>
  );
};

export default HistoryAdd;
