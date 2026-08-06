import { AdminSelectedDoctor } from "@/entities";
import { useAdminPatientView } from "@/shared/hooks/admin-patient-view/useAdminPatientView";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { PATIENT_VIEW_DAT_COL } from "./patientView.data.col";
import AdminCombineViewer from "@/entities/combine-viewer/ui/AdminCombineViewer";
import { Text } from "@/shared/ui";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
const PatientInformation = () => {
  const [visible, setVisible] = useState(false);
  const { patient_id } = useParams<{ patient_id: string }>();
  const {
    patient,
    attachments,
    revisions,
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

  const isDCM = patient?.rtype === "dcm";
  if (!patient_id) {
    return <div>Patient ID not found</div>;
  }

  if (adminPatientViewError) {
    return <div>Error loading patient data</div>;
  }

  if (!patient && !isAdminViewPatientLoading) {
    return <div>No patient data found</div>;
  }

  const patientStatus = patient?.status || "pending"; 
 

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row w-full mt-1 gap-6">
          <div className="flex-1/2">
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
        <AdminCombineViewer
          isDCM={isDCM}
          attachments={attachments}
          visible={visible}
          setVisible={setVisible}
          status={patientStatus}
          agent_id={patient?.agent_id?._id}
        />
      
        {revisions && revisions.length > 0 && (
        <div className="mt-4">
            <Text element="h3" fontWeight="semiBold">
              Review list
            </Text>
            {revisions && (
              <div>
                {revisions.map((r) => (
                  <div key={r.doctor_id._id} className="mt-2 p-4 border rounded-md bg-gray-50">
                    <Text element="h5" fontWeight="semiBold">
                      {r.doctor_id.email}  
                    </Text> 
                    
                    <Text element="div" size="md"> {parse(DOMPurify.sanitize(String(r.comments) || ""))}</Text>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        </div>
          <div className="flex-1/2">
           <div className="w-full">
            <AdminSelectedDoctor />
          </div>
          </div>

         
        </div> 
      </div>  

    </div>
  );
};

export default PatientInformation;
