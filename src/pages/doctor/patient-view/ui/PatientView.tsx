import { ReportSubmissionForm, XrayImages } from "@/entities";
import { useAuth, usePageTitle } from "@/shared/hooks";
import type { WSMessage } from "@/shared/hooks/use-web-socket/model/schema";
import { useWebSocket } from "@/shared/hooks/use-web-socket/model/useWebSocket";
import {
  useBackToOtherApiMutation,
  useGetDoctorPatientViewQuery,
} from "@/shared/redux/features/doctor/patient-view/patientViewApi";
import { Button, Panel, PanelHeading } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "viewerjs/dist/viewer.css";
import { PATIENT_VIEW_DAT_COL } from "./patientView.data.col";

const PatientView = () => {
  usePageTitle("Patient View", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
  const { patient_id } = useParams<{ patient_id: string }>();
  const navigate = useNavigate();
  const {
    data: patient_view,
    isLoading: patientLoading,
    error,
  } = useGetDoctorPatientViewQuery(patient_id!);
  const [backToOtherView] = useBackToOtherApiMutation();
  const patient = patient_view?.patient;
  const attachments = patient_view?.attachments ?? [];
  const { user } = useAuth();

  const wsUrl = import.meta.env.VITE_WS_URL;
  const { sendMessage, isOpen } = useWebSocket<WSMessage>(wsUrl, 5000);

  const patientId = patient?._id;
  // console.log(user);
  useEffect(() => {
    if (!patientId || !isOpen || !user) return;
    const currentDoctor = {
      _id: user.id || user.id,
      email: user.email,
      id: user.id || "",
    };
    sendMessage({
      type: "view_online_doctor",
      payload: {
        patient_id: patientId,
        doctor: currentDoctor,
      },
    });
    sendMessage({
      type: "stop_viewing_patient",
      payload: {
        patient_id: patientId,
        doctor: currentDoctor,
      },
    });

    return () => {
      sendMessage({
        type: "stop_viewing_patient",
        payload: {
          patient_id: patientId,
          doctor: currentDoctor,
        },
      });
    };
  }, [patientId, sendMessage, isOpen, user]);

  const handleBackToOtherList = async () => {
    if (!patient_id) return;
    sendMessage({
      type: "back_view_patient",
      payload: { patient_id: patient_id },
    });
    try {
      await backToOtherView({
        _id: patient_id,
      }).unwrap();
      navigate("/doctor/patient");
    } catch (error) {
      console.error("Delete failed:", error);
      console.log("Full error object:", JSON.stringify(error, null, 2));
    }
  };

  const handleSubmitPatient = () => {
    if (!patient_id) return;
    sendMessage({
      type: "submit_patient",
      payload: {
        patient_id: patient_id,
        patient: patient,
      },
    });
  };
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
        history: patient.history
          ? `<h3 style="font-weight: bold; color: red;">${patient.history}</h3>`
          : "N/A",
        sex: patient.gender || "N/A",
        xray_name: patient.xray_name || "N/A",
        reference_by: patient.ref_doctor || "N/A",
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
    <Panel
      header={
        <PanelHeading
          title="Patient View"
          button={
            <Button
              className="!bg-green-500 !h-auto"
              onClick={handleBackToOtherList}
            >
              Back to Patient List
            </Button>
          }
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
      <XrayImages attachments={attachments} />
      <ReportSubmissionForm
        patient={patient || undefined}
        handleSubmitPatient={handleSubmitPatient}
        patient_id={patient_id}
      />
    </Panel>
  );
};

export default PatientView;
