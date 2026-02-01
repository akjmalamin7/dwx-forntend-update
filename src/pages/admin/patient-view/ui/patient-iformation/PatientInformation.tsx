import { AdminSelectedDoctor } from "@/entities";
import DwxViewer from "@/entities/dwx-viewer";
import XrayMobileImages from "@/entities/xray-mobile-images/ui/XrayMobileImages";
import { useAdminPatientView } from "@/shared/hooks/admin-patient-view/useAdminPatientView";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { PATIENT_VIEW_DAT_COL } from "./patientView.data.col";

const PatientInformation = () => {

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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
  const original_urls = useMemo(
    () => attachments?.map((att) => ({ src: att.original_url })),
    [attachments],
  );
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
        {/* <XrayImages attachments={attachments || []} /> */}
        <div className="hidden lg:block mt-6 gap-4">
          {/* <XrayImages attachments={attachments} /> */}
          <DwxViewer attachments={attachments} />
        </div>

        <div className="lg:hidden mt-6">
          <h4 className="font-bold mb-3 text-gray-700">X-Ray Images</h4>
          <div className="flex gap-3 flex-wrap">
            {attachments?.map((img, i) => (
              <div
                key={i}
                className="w-24 h-24 border rounded-md overflow-hidden cursor-pointer active:scale-95 transition-all shadow-sm"
                onClick={() => {
                  setActiveIndex(i);
                  setVisible(true);
                }}
              >
                <img
                  src={img.small_url}
                  className="w-full h-full object-cover"
                  alt="Thumbnail"
                />
              </div>
            ))}
          </div>
        </div>
        <XrayMobileImages
          isOpen={visible}
          onClose={() => setVisible(false)}
          images={original_urls ?? []}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          patient_id={patient_id}
        />
      </div>
      {/* <div className="w-1/2"> */}
      <div className="w-full">
        <AdminSelectedDoctor />
      </div>
    </div>
  );
};

export default PatientInformation;
