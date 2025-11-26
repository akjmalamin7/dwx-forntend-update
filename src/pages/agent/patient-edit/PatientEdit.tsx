import { AgentFormError } from "@/features/agent/agent-form-error";
import { usePageTitle } from "@/shared/hooks";
import { useGetProfile } from "@/shared/hooks/use-get-profile/useGetProfile";
import { useUpdatePatientMutation } from "@/shared/redux/features/agent/add-patient/addPatientApi";
import { useGetPatientViewQuery } from "@/shared/redux/features/agent/patient-view/patientViewApi";
import { Loader, Panel, PanelHeading } from "@/shared/ui";
import type { PatientFormValues } from "@/shared/utils/types/types";
import { PatientForm } from "@/widgets";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
const PatientEdit = () => {
  const { status, isProfileLoading } = useGetProfile();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [updatePatient, { isLoading: isUpdateLoading }] =
    useUpdatePatientMutation();

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

    // Extract image URLs from attachments
    const imageUrls = data.attachments.flatMap((item) =>
      item.attachment
        .flat()
        .filter((url) => typeof url === "string" && url.startsWith("http"))
    );

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

      selected_drs_id: data.patient?.selected_drs_id || [],
      ignored_drs_id: data.patient?.ignored_drs_id || [],

      attachment: imageUrls,
      rtype: data.patient?.rtype ?? "xray",
      study_for: data.patient?.study_for ?? "xray_dr",
    };
  };

  const defaultValues = transformPatientData(patientData);

  //   submit data
  const onSubmit: SubmitHandler<PatientFormValues> = async (data) => {
    const finalData = {
      ...data,
      rtype: "xray",
      study_for: "xray_dr",
    };
    try {
      await updatePatient({ id, data: finalData }).unwrap();
      setResetCount((prev) => prev + 1);
      navigate("/");
    } catch (err: unknown) {
      console.error("Error creating patient:", err);
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
      <Panel
        header={
          <PanelHeading
            title="Edit X-ray Report"
            button="Patient List"
            path="agent/patient/completed"
          />
        }
      >
        <div className="flex justify-center items-center py-8">
          Loading patient data...
        </div>
      </Panel>
    );
  }

  if (isError) {
    return (
      <Panel
        header={
          <PanelHeading
            title="Edit X-ray Report"
            button="Patient List"
            path="agent/patient/completed"
          />
        }
      >
        <div className="flex justify-center items-center py-8 text-red-500">
          Error loading patient data. Please try again.
        </div>
      </Panel>
    );
  }

  if (!patientData) {
    return (
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
    );
  }

  if (isProfileLoading) <Loader />;

  if (status !== "active") {
    return (
      <AgentFormError title="Something went wrong!. Please contact with support." />
    );
  }

  return (
    <Panel
      header={
        <PanelHeading
          title="Add X-ray Report"
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
  );
};

export default PatientEdit;
