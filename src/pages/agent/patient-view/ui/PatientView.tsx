import { XrayImages } from "@/entities";
import { usePageTitle } from "@/shared/hooks";
import { useGetPatientViewQuery } from "@/shared/redux/features/agent/patient-view/patientViewApi";
import { Panel, PanelHeading } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import "viewerjs/dist/viewer.css";
import { PATIENT_VIEW_DAT_COL } from "./patientView.data.col";

const PatientView = () => {
  const { patient_id } = useParams<{ patient_id: string }>();
  const {
    data: patient_view,
    isLoading: patientLoading,
    error,
  } = useGetPatientViewQuery(patient_id!, { skip: !patient_id });

  const patient = patient_view?.patient;
  const attachments = patient_view?.attachments;
  console.log(patient_view);
  const DATA_TABLE: DataSource[] = useMemo(() => {
    if (!patient) return [];

    return [
      {
        key: patient._id || `patient-${Date.now()}`,
        patient_id: patient.patient_id || "N/A",
        patient_name: patient.name || "N/A",
        age: patient.age || "N/A",
        date: patient.createdAt
          ? new Date(patient.createdAt).toLocaleDateString("en-GB")
          : "N/A",
        history: patient.history || "N/A",
        sex: patient.gender || "N/A",
        xray_name: patient.xray_name || "N/A",
        reference_by: patient.ref_doctor || "N/A",
      },
    ];
  }, [patient]);

  usePageTitle("View Patient", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
  if (!patient_id) {
    return <div>Patient ID not found</div>;
  }

  if (error) {
    return <div>Error loading patient data</div>;
  }

  if (!patient && !patientLoading) {
    return <div>No patient data found</div>;
  }

  return (
    <Panel
      header={
        <PanelHeading
          title="Patient View"
          button="Back to Patient List"
          path="/agent/patient-list"
        />
      }
      size="lg"
    >
      {patient && (
        <div className="p-4">
          <Table
            columns={PATIENT_VIEW_DAT_COL}
            dataSource={DATA_TABLE}
            loading={patientLoading}
            border="bordered"
          />
        </div>
      )}

      {/* Image Viewer Section */}
      <XrayImages attachments={attachments || []} />
    </Panel>
  );
};

export default PatientView;
