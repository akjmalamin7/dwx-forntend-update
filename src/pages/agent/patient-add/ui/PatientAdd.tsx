
import { useAddPatientMutation } from "@/shared/redux/features/agent/add-patient/addPatientApi";
import { Panel, PanelHeading } from "@/shared/ui";
import { type PatientFormValues } from "@/shared/utils/types/types";
import { PatientForm } from "@/widgets";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";

const PatientAdd = () => {
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
