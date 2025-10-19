import { useGetPatientViewQuery } from "@/shared/redux/features/doctor/patient-view/patientViewApi";
import { Input, Panel, PanelHeading, Text } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import Viewer from "viewerjs";
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
          title="Patient View"
          button="Back to Patient List"
          path="/agent/patient-completed"
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
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">X-Ray Images</h2>
        <div ref={viewerRef} className="flex gap-4 flex-wrap">
          {attachments && attachments.length > 0 ? (
            attachments.map((attachment) => (
              <Fragment key={attachment._id}>
                {attachment.attachment.flat().map((img, index) => (
                  <div
                    key={`${attachment._id}-${index}`}
                    className="border rounded-md  border-gray-300 "
                  > 

                    <img
                      src={img}
                      alt={`Patient X-Ray ${index + 1}`}
                      width={200}
                      height={150}
                      className="object-cover cursor-pointer"
                    />
                  </div>
                ))}
              </Fragment>
            ))
          ) : (
            <div className="text-gray-500">No X-Ray images available</div>
          )}
        </div>
      </div>


       <form>

               <div className="flex gap-4 mb-4">
                <div className="w-1/2">

                 <Text element="label"  
                 fontWeight="bold" size="md"
                 className="block mb-2 text-gray-900 dark:text-white"
                  >
                  Admin Format
                  </Text> 
                   <select className="border px-4 py-2">
                    <option value="">Select Personal Format</option>
                    <option value="format1">Format 1</option>
                    <option value="format2">Format 2</option>
                    <option value="format3">Format 3</option>

                  </select>
                </div>

                <div className="w-1/2">
                 <Text element="label"  
                 fontWeight="bold" size="md"
                 className="block mb-2 text-gray-900 dark:text-white"
                  >
                  Personal Format
                  </Text>  
                  
                   <select className="border px-4 py-2">
                    <option value="">Select Personal Format</option>
                    <option value="format1">Format 1</option>
                    <option value="format2">Format 2</option>
                    <option value="format3">Format 3</option>

                  </select>
                </div>
              </div>


                <input type="hidden" name="patient_id"   />
                <input type="hidden" name="doctor_id" /> 
                 
                 <Input type="text" placeholder="Report comment box here/ Need jodit Editor" /> 

                <label className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    name="passault"
                    value="Yes" 
                  />
                  This report is for medical diagnosis only, not for legal use
                </label>

                <button
                  type="submit" 
                  className="group flex items-center rounded-md text-white text-sm font-medium pl-5 pr-5 mt-3 py-2 shadow-sm
                    bg-[#31B0D5] hover:bg-blue-400"
                >
                 Submit 
                </button>
              </form>

    </Panel>
  );
};

export default PatientView;
