import { usePageTitle } from "@/shared/hooks";

import {
  useGetAgentPatientPrintQuery,
  useUpdateAgentPatientPrintStatusMutation,
} from "@/entities/agent/agent-print-patient";
import { Button, Input, Panel, PanelHeading } from "@/shared/ui";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PrintDrSignature from "./print-dr-signature/PrintDrSignature";
import { PrintPatientComment } from "./print-patient-comment/PrintPatientComment";
import PrintPatientInfo from "./print-patient-info/PrintPatientInfo";
import PrintPreparedBy from "./print-prepared-by/PrintPreparedBy";
const PatientPrint = () => {
  const { id } = useParams<{ id: string }>();
  const [paddingTop, setPaddingTop] = useState("2");
  const {
    data: print_view,
    isLoading,
    isError,
  } = useGetAgentPatientPrintQuery(id!, {
    skip: !id,
  });
  const [updateAgentPatientPrintStatus, { isLoading: isUpdatePrinting }] =
    useUpdateAgentPatientPrintStatusMutation();

  const printPatient = print_view?.data;
  const comments = print_view?.data?.doctorcomments;
  const signature = print_view?.data?.completed_dr;
  const rtype = print_view?.data?.rtype;
  const xrayName = print_view?.data?.xray_name;
  const latestPassault = comments?.[0]?.passault;
  const passaultValue = latestPassault === "Yes" ? "Yes" : "";
  const handlePrint = async () => {
    if (!id) return;
    try {
      await updateAgentPatientPrintStatus(id).unwrap();

      window.print();
    } catch (error) {
      console.error("Print status update failed:", error);
      alert("Status update failed, but you can still try to print manually.");
    }
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
              margin-top: ${paddingTop}in;
            }
          }
        `}
      </style>

      <Panel
        header={
          <PanelHeading
            title="Print Patient Report"
            button={
              <Button
                className="bg-green-500"
                loading={isUpdatePrinting}
                disabled={isUpdatePrinting}
                onClick={handlePrint}
              >
                Print Report
              </Button>
            }
          />
        }
        size="lg"
      >
        <div className="mb-5 print:hidden">
          <div className="w-[200px]">
            <Input
              label="Gap"
              size="sm"
              value={paddingTop}
              onChange={(e) => setPaddingTop(e.target.value)}
              placeholder="Gap for header area"
            />
          </div>
          <div></div>
        </div>
        {/* Table */}
        <PrintPatientInfo printPatient={printPatient} />

       
<div  contentEditable>
        <h1     
          className="mb-4 font-bold text-3xl uppercase text-center underline"
         
        >
          {rtype} Report of {xrayName}
        </h1>
        </div>

        <PrintPatientComment comments={comments || []} />

        <div className="after:content-[''] after:table after:clear-both"></div>

        {/* Prepared by + Signature Section */}
        <div className="flex justify-between items-center mt-16 /*print:fixed print:bottom-0*/ print:left-0 print:right-0   print:mt-10">
          <PrintDrSignature signature={signature} passault={passaultValue} />
          <PrintPreparedBy />
        </div>
      </Panel>
    </>
  );
};

export default PatientPrint;
