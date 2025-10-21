import { AdminFormatList, Editor, PersonalFormatList } from "@/features";
import { useSavePatientMutation } from "@/shared/redux/features/doctor/patient-save/patientSaveApi";
import { Button, Input, Text } from "@/shared/ui";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IProps {
  patient_id: string;
}

interface FormData {
  patient_id: string;
  comments: string;
  passault: string;
}

interface ApiError {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
}

const ReportSubmissionForm = ({ patient_id }: IProps) => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<"admin" | "personal" | "">(
    ""
  );
  const [isMedicalDiagnosis, setIsMedicalDiagnosis] = useState<boolean>(false);
  const [savePatient, { isLoading }] = useSavePatientMutation();

  const { handleSubmit, setValue, watch, register, reset } = useForm<FormData>({
    defaultValues: {
      patient_id: patient_id,
      comments: "",
      passault: "",
    },
    mode: "onChange",
  });

  const commentsValue = watch("comments");

  const isFormValid = useMemo(() => {
    return commentsValue && commentsValue.trim().length > 0;
  }, [commentsValue]);

  const handleAdminSelect = (value: string) => {
    if (value) {
      setValue("comments", value, { shouldValidate: true });
      setSelectedType("admin");
    } else {
      setValue("comments", "", { shouldValidate: true });
      setSelectedType("");
    }
  };

  const handlePersonalSelect = (value: string) => {
    if (value) {
      setValue("comments", value, { shouldValidate: true });
      setSelectedType("personal");
    } else {
      setValue("comments", "", { shouldValidate: true });
      setSelectedType("");
    }
  };

  const handleEditorChange = (content: string) => {
    setValue("comments", content, { shouldValidate: true });
  };

  const handleMedicalDiagnosisChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setIsMedicalDiagnosis(isChecked);
    setValue("passault", isChecked ? "Yes" : "", { shouldValidate: true });
  };

  const resetForm = () => {
    reset({
      patient_id: patient_id,
      comments: "",
      passault: "",
    });
    setSelectedType("");
    setIsMedicalDiagnosis(false);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const submitData = {
        patient_id: data.patient_id || patient_id,
        comments: data.comments || "",
        passault: data.passault || "",
      };

      await savePatient(submitData).unwrap();

       navigate("/doctor/patient"); 
      resetForm();
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error submitting form:", apiError);

      if (apiError.data) {
        console.error("Server error details:", apiError.data);
      }
      if (apiError.status) {
        console.error("HTTP Status:", apiError.status);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 mb-4">
        <PersonalFormatList onSelect={handlePersonalSelect} />
        <AdminFormatList onSelect={handleAdminSelect} />
      </div>

      <Input type="hidden" {...register("patient_id")} />

      <div>
        <Editor
          value={commentsValue}
          onChange={handleEditorChange}
          placeholder="Select a format above or type your comments here..."
        />
      </div>

      {selectedType && (
        <Text size="sm" className="mt-2 text-gray-600">
          {selectedType === "admin" ? "Admin Format" : "Personal Format"}
        </Text>
      )}

      <label className="mt-4 flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isMedicalDiagnosis}
          onChange={handleMedicalDiagnosisChange}
          className="w-[20px] h-[20px] mt-1"
        />
        <Text size="lg">
          This report is for medical diagnosis only, not for legal use
        </Text>
      </label>

      <Input type="hidden" {...register("passault")} />

      <div className="mt-4">
        <Button
          type="submit"
          color="dark"
          size="size-2"
          loading={isLoading}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Submitting" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default ReportSubmissionForm;
