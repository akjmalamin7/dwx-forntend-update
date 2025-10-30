import { AdminSelectedDoctor, XrayImages } from "@/entities";
import { useGetAdminPatientViewQuery } from "@/shared/redux/features/admin/patient-view/patientViewApi";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { PATIENT_VIEW_DAT_COL } from "./patientView.data.col";

const PatientInformation = () => {
  const { patient_id } = useParams<{ patient_id: string }>();
  const {
    data: patient_view,
    isLoading: patientLoading,
    error,
  } = useGetAdminPatientViewQuery(patient_id!, { skip: !patient_id });

  const patient = patient_view?.data.patient;
  const attachments = patient_view?.data.attachments;

  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<Viewer | null>(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerInstance.current = new Viewer(viewerRef.current, {
        inline: false,
        navbar: false,
        toolbar: {
          zoomIn: 1,
          zoomOut: 1,
          reset: 1,
          oneToOne: 1,
          prev: 1,
          play: 0,
          next: 1,
          rotateLeft: 1,
          rotateRight: 1,
          flipHorizontal: 1,
          flipVertical: 1,
        },
        title: false,
      });
    }

    return () => {
      viewerInstance.current?.destroy();
    };
  }, []);

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

  if (error) {
    return <div>Error loading patient data</div>;
  }

  if (!patient && !patientLoading) {
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
              loading={patientLoading}
              border="bordered"
              size="xs"
            />
          </div>
        )}

        {/* Image Viewer Section */}
        <XrayImages attachments={attachments || []} />
      </div>
      {/* <div className="w-1/2"> */}
      <div className="w-full">
        <AdminSelectedDoctor />
      </div>
    </div>
  );
};

export default PatientInformation;
