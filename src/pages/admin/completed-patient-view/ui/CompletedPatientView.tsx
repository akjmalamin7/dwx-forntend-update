import { Editor } from "@/features";
import { usePageTitle } from "@/shared/hooks";
import {
  useGetAdminCompletedPatientQuery,
  useUpdateAdminCompletedPatientMutation,
} from "@/shared/redux/features/admin/completed-patients/completedPatientsApi";
import { Button, Checkbox, Panel, PanelHeading, Text } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "viewerjs/dist/viewer.css";
import { ADMIN_COMPLETED_REPORT_UDPAT_SCHEMA } from "../model/schema";
import { PatientInformation } from "./patient-iformation";
import { AddNewImageForm, AdminUpdatePatientForm, ClonePatient } from "@/entities";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const CompletedPatientView = () => {
  const { patient_id } = useParams<{ patient_id: string }>();
  usePageTitle("Patient View", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
  const [updateAdminCompletedPatient, { isLoading }] =
    useUpdateAdminCompletedPatientMutation();
  const { data } = useGetAdminCompletedPatientQuery(patient_id as string);
  const comments = data?.data.comments?.comments;
  const passault = data?.data.comments?.passault;

  const revisions = useMemo(() => {
    if (!data?.data?.revisions) return [];
    return data.data.revisions
      .filter(
        (r): r is typeof r & { doctor_id: { name: string } } => !!r?.doctor_id
      )
      .map((r, index) => ({
        label: `Revision ${index + 1}`,
        name: r.doctor_id.name,
        comments: r.comments,
      }));
  }, [data?.data?.revisions]);

  const form = useForm({
    resolver: yupResolver(ADMIN_COMPLETED_REPORT_UDPAT_SCHEMA),
    mode: "onChange",
    values: {
      passault: passault || "No",
      comments: comments || "",
    },
  });

  const handleEditorChange = (content: string) => {
    form.setValue("comments", content, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  const onSubmit = form.handleSubmit(async (formData) => {
    if (!patient_id) {
      console.error("Patient ID is missing");
      return;
    }

    try {
      await updateAdminCompletedPatient({
        patient_id: patient_id,
        data: formData,
      }).unwrap();
    } catch (err) {
      console.error("Error updating patient:", err);
    }
  });
  return (
    <Panel
      header={
        <PanelHeading
          title="Patient View"
          button="Back to Patient List"
          path="/agent/patient-completed"
        />
      }
      size="xl"
    >
      <PatientInformation />
      <div className="flex flex-col-reverse lg:flex-row w-full mt-8 gap-6">
        <div className="flex-1">
          <FormProvider {...form}>
            <Controller
              control={form.control}
              name="comments"
              render={({ field }) => (
                <Editor {...field} onChange={handleEditorChange} />
              )}
            />

            <div className="mt-3">
              <Controller
                control={form.control}
                name="passault"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value === "Yes"}
                    onChange={(e) =>
                      field.onChange(e.target.checked ? "Yes" : "No")
                    }
                    label=" This report is for medical diagnosis only, not for legal use"
                  />
                )}
              />
            </div>
          </FormProvider>
          <Button
            size="size-2"
            className="mt-3"
            type="submit"
            loading={isLoading}
            onClick={onSubmit}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Text element="h3" fontWeight="semiBold">
          Review list
        </Text>
        {revisions && (
          <div>
            {revisions.map((r) => (
              <div key={r.label} className="mt-2 p-4 border rounded-md bg-gray-50">
                <Text element="h5" fontWeight="semiBold">
                  {r.label}
                </Text>
                <Text size="lg" fontWeight="bold">{r.name}</Text>
                
                <Text size="md"> {parse(DOMPurify.sanitize(String(r.comments) || ""))}</Text>
              </div>
            ))}
          </div>
        )}
      </div>

       <div className="flex flex-col-reverse lg:flex-row w-full mt-8 gap-6">
          <div className="flex-1/2">
            <ClonePatient />
          </div>
          <div className="flex-1/2 flex flex-col gap-6">
            <AddNewImageForm />
            <AdminUpdatePatientForm />
          </div>
        </div>
    </Panel>
  );
};

export default CompletedPatientView;
