
import { useAdminPatientView } from "@/shared/hooks/admin-patient-view/useAdminPatientView";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PATIENT_VIEW_DAT_COL } from "./patientView.data.col";
import { XrayImages } from "@/entities";

const PatientInformation = () => {
  const { patient_id } = useParams<{ patient_id: string }>();
  const {
    patient,
    attachments,
    isAdminViewPatientLoading,
    adminPatientViewError,
  } = useAdminPatientView();


  const DATA_TABLE: DataSource[] = useMemo(() => {
    if (!patient) return [];

    return [
      {
        key: patient._id || `patient-${Date.now()}`,
        patient_id: patient.patient_id || "N/A",
        patient_name: patient.name || "N/A",
        age: patient.age || "N/A",
        history: patient.history || "N/A",
        sex: patient.gender || "N/A",
        agent_name: patient.agent_id?.email,
      },
    ];
  }, [patient]);

  if (!patient_id) {
    return <div>Patient ID not found</div>;
  }

  if (adminPatientViewError) {
    return <div>Error loading patient data</div>;
  }

  if (!patient && !isAdminViewPatientLoading) {
    return <div>No patient data found</div>;
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full">
        {patient && (
          <div className="p-4 responsive">
            <Table
              columns={PATIENT_VIEW_DAT_COL}
              dataSource={DATA_TABLE}
              loading={isAdminViewPatientLoading}
              border="bordered"
              size="xs"
            />
          </div>
        )}

        {/* Image Viewer Section */}
        <XrayImages attachments={attachments || []} />
      </div>
     
    </div>
  );
};

export default PatientInformation;
