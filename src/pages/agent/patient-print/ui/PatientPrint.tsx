import { usePageTitle } from "@/shared/hooks";
import { useGetPatientPrintQuery } from "@/shared/redux/features/agent/patient-print/patientPrint";
import { Button, Panel, PanelHeading, Text } from "@/shared/ui";
import { useParams } from "react-router-dom";
import PrintDrSignature from "./print-dr-signature/PrintDrSignature";
import { PrintPatientComment } from "./print-patient-comment/PrintPatientComment";
import PrintPatientInfo from "./print-patient-info/PrintPatientInfo";
import PrintPreparedBy from "./print-prepared-by/PrintPreparedBy";
const PatientPrint = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: print_view,
    isLoading,
    isError,
  } = useGetPatientPrintQuery(id!, {
    skip: !id,
  });
  const printPatient = print_view?.data;
  const comments = print_view?.data?.doctorcomments;
  const signature = print_view?.data?.completed_dr;
  const latestPassault = comments?.[0]?.passault;
  const passaultValue = latestPassault === "Yes" ? "Yes" : "";

  const handlePrint = () => {
    window.print();
  };

  usePageTitle("Print Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  // Loading state
  if (isLoading) {
    return (
      <Panel
        header={<PanelHeading title="Print Patient Report" button="" path="" />}
      >
        <div className="flex justify-center items-center py-8">
          Loading patient data for printing...
        </div>
      </Panel>
    );
  }

  // Error state
  if (isError) {
    return (
      <Panel
        header={<PanelHeading title="Print Patient Report" button="" path="" />}
      >
        <div className="flex justify-center items-center py-8 text-red-500">
          Error loading patient data. Please try again.
        </div>
      </Panel>
    );
  }

  // If no data found
  if (!print_view || !printPatient) {
    return (
      <Panel
        header={<PanelHeading title="Print Patient Report" button="" path="" />}
      >
        <div className="flex justify-center items-center py-8 text-yellow-500">
          Patient data not found.
        </div>
      </Panel>
    );
  }

  return (
    <>
      <style>
        {`
          @media print {
            @page {
              margin-top: 2in;
            }
          }
        `}
      </style>

      <Panel
        header={
          <PanelHeading
            title="Print Patient Report"
            button={
              <Button className="bg-green-500" onClick={handlePrint}>
                Print Report
              </Button>
            }
          />
        }
        size="lg"
      >
        {/* Table */}
        <PrintPatientInfo printPatient={printPatient} />

        <Text
          element="h2"
          textAlign="center"
          textDecoration="underline"
          size="3xl"
          fontWeight="bold"
          className="mb-4 font-bold uppercase"
        >
          X-Ray Report of Chest P/A View
        </Text>

        <PrintPatientComment comments={comments || []} />

        <div className="after:content-[''] after:table after:clear-both"></div>

        {/* Prepared by + Signature Section */}
        <div className="flex justify-between items-center mt-16 print:fixed print:bottom-0 print:left-0 print:right-0   print:mt-0">
          <PrintDrSignature signature={signature} passault={passaultValue} />
          <PrintPreparedBy />
        </div>
      </Panel>
    </>
  );
};

export default PatientPrint;
