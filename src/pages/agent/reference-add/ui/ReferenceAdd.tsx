import { ReferenceForm } from "@/entities";
import { useAddReferenceMutation } from "@/shared/redux/features/agent/reference-add/addPatientApi";
import { Panel, PanelHeading } from "@/shared/ui";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { type ReferenceFormValues } from "./referenceAdd.types";
import { usePageTitle } from "@/shared/hooks";
import toast, { Toaster } from "react-hot-toast";

const ReferenceAdd = () => {
  const [resetCount, setResetCount] = useState<number>(0);
  const [createReference, { isLoading }] = useAddReferenceMutation();

  const onSubmit: SubmitHandler<ReferenceFormValues> = async (data) => {
    try {
      await createReference(data).unwrap();

      
      setResetCount((prev) => prev + 1);

      // Success toast
      toast.success("Reference submitted successfully!", {
        duration: 2000,
        position: "top-right",
      });
      
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating patient:", e.data?.message || e.message);
      } else {
        console.error("Error creating patient:", String(err));
      }

      // Error toast
      toast.error("Failed to submit reference request. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  usePageTitle("Add Reference", {
      prefix: "DWX - ",
      defaultTitle: "DWX",
      restoreOnUnmount: true,
    });
    
  return (
    <>
      <Toaster />
      <Panel
        header={
          <PanelHeading
            title="Add Reference"
            button="Reference List"
            path="/agent/reference-list"
          />
        }
      >
        <ReferenceForm
          onSubmit={onSubmit}
          resetCount={resetCount}
          isLoading={isLoading}
          key={resetCount}
        />
      </Panel>
    </>
  );
};

export default ReferenceAdd;
