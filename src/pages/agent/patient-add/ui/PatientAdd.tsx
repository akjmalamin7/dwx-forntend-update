import { AgentFormError } from "@/features/agent/agent-form-error";
import { usePageTitle } from "@/shared/hooks";
import { useGetProfile } from "@/shared/hooks/use-get-profile/useGetProfile";
import { useAddPatientMutation } from "@/shared/redux/features/agent/add-patient/addPatientApi";
import { Loader, Panel, PanelHeading } from "@/shared/ui";
import { type PatientFormValues } from "@/shared/utils/types/types";
import { PatientForm } from "@/widgets";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";

const PatientAdd = () => {
  const { status, isProfileLoading } = useGetProfile();
  const [createPatient, { isLoading }] = useAddPatientMutation();
  const [resetCount, setResetCount] = useState<number>(0);

  const onSubmit: SubmitHandler<PatientFormValues> = async (data) => {
    const finalData = {
      ...data,
      rtype: "xray",
      study_for: "xray_dr",
    };

    try {
      await createPatient(finalData).unwrap();
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
  if (status !== "active") {
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

export default PatientAdd;
