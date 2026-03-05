import { Panel, PanelHeading } from "@/shared/ui";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { type SoftwareFormValues } from "./softwareAdd.types";  
import { usePageTitle } from "@/shared/hooks";
import { useAddSoftwareMutation } from "@/shared/redux/features/admin/software-add/addSoftwareApi";
import { SoftwareForm } from "@/entities/software-form";
import toast, { Toaster } from "react-hot-toast";

const SoftwareAdd = () => {
  const [resetCount, setResetCount] = useState<number>(0);
  const [createSoftware, { isLoading }] = useAddSoftwareMutation();

  const onSubmit: SubmitHandler<SoftwareFormValues> = async (data) => {
    try {
      await createSoftware(data).unwrap();
      setResetCount((prev) => prev + 1);

      // Success toast
      toast.success("Software added successfully!", {
        duration: 2000,
        position: "top-right",
      });
      
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating xray type:", e.data?.message || e.message);
      } else {
        console.error("Error creating xray type:", String(err));
      }

      // Error toast
      toast.error("Failed to save settings. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
        
    }
  };


  usePageTitle("Add Software", {
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
            title="Add Software"
            button="Software List"
            path="/admin/software-list"
          />
        }
      >
        <SoftwareForm
          onSubmit={onSubmit}
          resetCount={resetCount}
          isLoading={isLoading}
          key={resetCount}
        />
      </Panel>
    </>
  );
};

export default SoftwareAdd;
