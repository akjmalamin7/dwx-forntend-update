import { useUpdateReportMutation } from "@/entities/agent/send-report";
import { AgentFormError } from "@/features/agent/agent-form-error";
import { usePageTitle } from "@/shared/hooks";
import { useGetProfile } from "@/shared/hooks/use-get-profile/useGetProfile";
import { useGetPatientViewQuery } from "@/shared/redux/features/agent/patient-view/patientViewApi";
import { Loader, Message, Panel, PanelHeading } from "@/shared/ui";
import type { PatientFormValues } from "@/shared/utils/types/types";
import { PatientForm } from "@/widgets";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EditSendReport = () => {
  const { status, isProfileLoading } = useGetProfile();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [updateSendReport, { isLoading: isUpdateLoading }] =
    useUpdateReportMutation();

  const [resetCount, setResetCount] = useState<number>(0);
  const {
    data: patientData,
    isLoading: isViewLoading,
    isError,
  } = useGetPatientViewQuery(id!, { skip: !id });

  const transformPatientData = (
    data: typeof patientData
  ): Partial<PatientFormValues> => {
    if (!data) {
      return {};
    }
    const original_urls =
      data.attachments?.map((item) => item.original_url) || [];
    const small_urls = data.attachments?.map((item) => item.small_url) || [];

    return {
      patient_id: data.patient?.patient_id ?? "",
      name: data.patient?.name ?? "",
      age: data.patient?.age ?? "",
      history: data.patient?.history ?? "",
      gender: (data.patient?.gender === "male" ||
      data.patient?.gender === "female"
        ? data.patient?.gender
        : "male") as "male" | "female",
      xray_name: data.patient?.xray_name ?? "",
      ref_doctor: data.patient?.ref_doctor ?? "",
      image_type: (data.patient?.image_type === "multiple" ||
      data.patient?.image_type === "double" ||
      data.patient?.image_type === "single"
        ? data.patient?.image_type
        : "single") as "multiple" | "double" | "single",

      doctor_id: data.patient?.doctor_id || [],
      ignore_dr: data.patient?.ignore_dr || [],
      attachment: original_urls,
      small_url: small_urls,
      rtype: data.patient?.rtype ?? "xray",
      study_for: data.patient?.study_for ?? "xray_dr",
    };
  };

  const defaultValues = transformPatientData(patientData);

  //   submit data
  const onSubmit: SubmitHandler<PatientFormValues> = async (data) => {
    const finalData = {
      ...data,
      /*rtype: "xray",
      study_for: "xray_dr",*/
    };
    try {
 
      await updateSendReport({ id, data: finalData }).unwrap();
      setResetCount((prev) => prev + 1);
      // Success toast
      toast.success("Patient report updated successfully!", {
        duration: 2000,
        position: "top-right",
      });
      
      navigate("/");
    } catch (err: unknown) {
      console.error("Error creating patient:", err);
      // Error toast
      toast.error("Failed to submit report. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  usePageTitle("Edit Report", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const isLoading = isUpdateLoading || isViewLoading;

  if (isViewLoading) {
    return (
      <Message
        type="error"
        title="Edit X-ray Report"
        message="Loading patient data..."
      />
    );
  }

  if (isError) {
    return (
      <Message
        type="error"
        title="Edit X-ray Report"
        message="Error loading patient data. Please try again."
      />
    );
  }

  if (!patientData) {
    return (
       <>
          <Toaster />
          <Panel
            header={
              <PanelHeading
                title="Edit X-ray Report"
                button="Patient List"
                path="agent/patient/completed"
              />
            }
          >
            <div className="flex justify-center items-center py-8 text-yellow-500">
              Patient data not found.
            </div>
          </Panel>
      </>
    );
  }

  if (isProfileLoading) <Loader />;

  if (status !== "active") {
    return (
      <AgentFormError title="Something went wrong!. Please contact with support." />
    );
  }

  return (
     <>
      <Toaster />
      <Panel
        header={
          <PanelHeading
            title="=Edit  Report"
            button="Patient List"
            path="agent/patient/completed"
          />
        }
      >
        <PatientForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          resetCount={resetCount}
          defaultValues={defaultValues}
          isEdit
        />
      </Panel>
    </>
  );
};

export default EditSendReport;
