import { CombineViewer } from "@/entities/combine-viewer";
import { usePageTitle } from "@/shared/hooks";
import {
  useBackToOtherApiMutation,
  useGetDoctorPatientViewQuery,
} from "@/shared/redux/features/doctor/patient-view/patientViewApi";
import { Button, Panel, PanelHeading } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "viewerjs/dist/viewer.css";
import { PATIENT_VIEW_DAT_COL } from "./patientView.data.col";

const PatientView = () => {
  usePageTitle("Patient View");

  const { patient_id } = useParams<{ patient_id: string }>();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

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
  const isDCM = patient_view?.patient?.rtype === "dcm";

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
      size={isDCM ? "xl" : "lg"}
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
        <CombineViewer
          history={patient?.history}
          age={patient?.age}
          patient_id={patient_id}
          isDCM={isDCM}
          attachments={attachments}
          visible={visible}
          setVisible={setVisible}
        />
      </div>
    </Panel>
  );
};

export default PatientView;
