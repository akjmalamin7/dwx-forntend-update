import { ReportSubmissionForm, XrayImages } from "@/entities";
import { useGetDoctorCompletedPatientViewQuery } from "@/shared/redux/features/doctor/completed-patient-view/CompletedPatientViewApi";
import { Panel, PanelHeading } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import { PATIENT_VIEW_DAT_COL } from "./patientView.data.col";
const CompletedPatientView = () => {
  const [viewData, setViewData] = useState({ passault: "", comments: "" });
  const { patient_id } = useParams<{ patient_id: string }>();
  const {
    data: patient_view,
    isLoading: patientLoading,
    error,
  } = useGetDoctorCompletedPatientViewQuery(patient_id!);

  const patient = patient_view?.patient;
  const attachments = patient_view?.attachments ?? [];

  // const comments = patient_view && patient_view?.comments[0]?.comments;
  useEffect(() => {
    if (patient_view?.comments && patient_view.comments.length > 0) {
      const storedComments = patient_view.comments[0];
      setViewData({
        passault: storedComments.passault || "",
        comments: storedComments.comments || "",
      });
    }
  }, [patient_view]);

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
          title="Completed Patient View"
          button="Back to Pending Patient"
          path="/doctor/patient"
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
        patient_id={patient_id}
        commentsAndPassault={viewData}
        isUpdate
      />
    </Panel>
  );
};

export default CompletedPatientView;
