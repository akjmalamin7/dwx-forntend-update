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
const PatientRevInformation = () => {
  const [visible, setVisible] = useState(false);
  const { patient_id } = useParams<{ patient_id: string }>();
  const {
    patient,
    attachments,
    revisions,
    comments,
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
        completed_dr: patient.completed_dr?.email,
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
        />


        <div className="flex flex-col-reverse lg:flex-row w-full mt-2 gap-6">
                <div className="flex-1/2">
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
                <div className="flex-1/2 flex flex-col gap-6"> 
                    {comments && (
                      <div className="mt-4">
                        <Text element="h3" fontWeight="semiBold">
                          Last Comment
                        </Text>
                        <div  className="mt-2 p-4 border rounded-md bg-gray-30">
                        
                          <Text element="h3" fontWeight="semiBold">
                            Completed Doctor: {patient?.completed_dr?.email}
                          </Text>
                          <Text element="div" size="md">
                            {parse(DOMPurify.sanitize(comments?.comments || ""))}
                          </Text>
                          {comments?.passault==='Yes' && (
                            <Text element="p">This report is for medical diagnosis only, not for legal use</Text>
                          )}
                          
                        </div>
                      </div>
                  )}
                </div>
          </div>
 

        </div>
     
         
        </div> 
      </div>  

    </div>
  );
};

export default PatientRevInformation;
