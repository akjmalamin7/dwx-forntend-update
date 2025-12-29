import { useSendReportMutation } from "@/entities/agent/send-report";
import { AgentFormError } from "@/features/agent/agent-form-error";
import { usePageTitle } from "@/shared/hooks";
import { useGetProfile } from "@/shared/hooks/use-get-profile/useGetProfile";
import { Loader, Panel, PanelHeading } from "@/shared/ui";
import { type PatientFormValues } from "@/shared/utils/types/types";
import { PatientForm } from "@/widgets";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";

const SendXrayReport = () => {
  const { status, isProfileLoading } = useGetProfile();
  const [createSendReport, { isLoading }] = useSendReportMutation();
  const [resetCount, setResetCount] = useState<number>(0);

  // const wsUrl = import.meta.env.VITE_WS_URL;
  // const { sendMessage, isOpen, isConnecting } = useWebSocket(wsUrl, 5000);

  // WebSocket connection status monitor
  // useEffect(() => {
  //   if (isOpen) {
  //     console.log("WebSocket connected - ready for real-time updates");
  //   } else if (isConnecting) {
  //     console.log("WebSocket connecting...");
  //   } else {
  //     console.warn("WebSocket disconnected - real-time updates unavailable");
  //   }
  // }, [isOpen, isConnecting]);

  const onSubmit: SubmitHandler<PatientFormValues> = async (data) => {
    const finalData = {
      ...data,
      rtype: "xray",
      study_for: "xray_dr",
    };

    try {
      await createSendReport(finalData).unwrap();
      // sendMessage({ type: "new_xray_report", payload: result });
      // Reset through resetCount prop
      setResetCount((prev) => prev + 1);
    } catch (err: unknown) {
      console.error("Error creating patient:", err);
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
  );
};

export default SendXrayReport;
