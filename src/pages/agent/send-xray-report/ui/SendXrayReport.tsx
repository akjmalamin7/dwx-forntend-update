import { useSendReportMutation } from "@/entities/agent/send-report";
import { AgentFormError } from "@/features/agent/agent-form-error";
import { usePageTitle } from "@/shared/hooks";
import { useGetProfile } from "@/shared/hooks/use-get-profile/useGetProfile";
import { Loader, Panel, PanelHeading } from "@/shared/ui";
import { type PatientFormValues } from "@/shared/utils/types/types";
import { PatientForm } from "@/widgets";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const SendXrayReport = () => {
  const { status, isProfileLoading } = useGetProfile();
  const [createSendReport, { isLoading }] = useSendReportMutation();
  const [resetCount, setResetCount] = useState<number>(0);
  const onSubmit: SubmitHandler<PatientFormValues> = async (data) => {
    const finalData = {
      ...data,
      rtype: "xray",
      study_for: "xray_dr",
    };
 
    try {
      await createSendReport(finalData).unwrap();
      setResetCount((prev) => prev + 1);

       // Success toast
      toast.success("Patient report submitted successfully!", {
        duration: 2000,
        position: "top-right",
      });

    } catch (err: unknown) {
      console.error("Error creating patient:", err);

      // Error toast
      toast.error("Failed to submit report. Please try again.", {
        duration: 2000,
        position: "top-right",
      });

    }
  };
  usePageTitle("Add Patient", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
  if (isProfileLoading) <Loader />;
  if (status == "inactive") {
    return (
      <AgentFormError title="Something went wrong!. Please contact with support." />
    );
  }
  return (
    <>
     <Toaster />
    <Panel
      header={
        <PanelHeading
          title="Add X-ray Report"
          button="Patient List"
          path="agent/patient/completed"
        />
      }
    > 
      <PatientForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        resetCount={resetCount}
      />
    </Panel>
    </>
  );
};

export default SendXrayReport;
