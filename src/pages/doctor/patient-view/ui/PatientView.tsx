import { ReportSubmissionForm } from "@/entities";
import DwxViewer from "@/entities/dwx-viewer";
import XrayMobileImages from "@/entities/xray-mobile-images/ui/XrayMobileImages";
import { usePageTitle } from "@/shared/hooks";
import {
  useBackToOtherApiMutation,
  useGetDoctorPatientViewQuery,
} from "@/shared/redux/features/doctor/patient-view/patientViewApi";
import { Button, Panel, PanelHeading } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "viewerjs/dist/viewer.css";
import { PATIENT_VIEW_DAT_COL } from "./patientView.data.col";

const PatientView = () => {
  usePageTitle("Patient View");

  const { patient_id } = useParams<{ patient_id: string }>();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleSceneChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setVisible(false);
      }
    };

    handleSceneChange(mediaQuery);
    mediaQuery.addEventListener("change", handleSceneChange);

    return () => mediaQuery.removeEventListener("change", handleSceneChange);
  }, []);

  const {
    data: patient_view,
    isLoading: patientLoading,
    error,
  } = useGetDoctorPatientViewQuery(patient_id!, {
    refetchOnMountOrArgChange: true,
    skip: !patient_id,
  });

  const [backToOtherView, { isLoading: isLoadingBack }] =
    useBackToOtherApiMutation();

  const attachments = patient_view?.attachments;
  const patient = patient_view?.patient;

  const original_urls = useMemo(
    () => attachments?.map((att) => ({ src: att.original_url })),
    [attachments],
  );

  const handleBackToOtherList = async () => {
    if (!patient_id) return;
    try {
      await backToOtherView({ _id: patient_id }).unwrap();
      navigate("/doctor/patient");
    } catch (err) {
      console.error(err);
    }
  };

  if (!patient_id || error) {
    navigate("/doctor/patient");
    return null;
  }

  return (
    <Panel
      header={
        <PanelHeading
          title="Patient View"
          button={
            <Button
              loading={isLoadingBack}
              className="!bg-green-500 !h-auto"
              onClick={handleBackToOtherList}
            >
              Back to Patient List
            </Button>
          }
        />
      }
      size="xl"
    >
      <div className="px-2 py-4">
        {patient && (
          <Table
            size="xl"
            columns={PATIENT_VIEW_DAT_COL}
            dataSource={[{ ...patient, key: patient._id }]}
            loading={patientLoading}
            border="bordered"
          />
        )}

        <div className="hidden lg:block mt-6">ফফফ
          {/* <XrayImages attachments={attachments} /> */}
          <DwxViewer attachments={attachments} />
          <ReportSubmissionForm patient_id={patient_id} />
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
    </Panel>
  );
};

export default PatientView;
