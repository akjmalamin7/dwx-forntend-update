import { AdminFormatList, Editor, PersonalFormatList } from "@/features";
import {
  useSavePatientMutation,
  useUpdatePatientMutation,
} from "@/shared/redux/features/doctor/patient-save/patientSaveApi";
import { Button, Input, Text } from "@/shared/ui";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

interface GetCommentsAndPassaultType {
  passault?: string;
  comments?: string;
}

interface IProps {
  patient_id: string;
  commentsAndPassault?: GetCommentsAndPassaultType;
  isUpdate?: boolean;
}

interface FormData {
  patient_id: string;
  comments: string;
  passault?: string;
}

interface ApiError {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
}

const ReportSubmissionForm = ({
  patient_id,
  commentsAndPassault,
  isUpdate = false,
}: IProps) => {
  const [selectedType, setSelectedType] = useState<"admin" | "personal" | "">(
    ""
  );
  const navigate = useNavigate();
  const [isMedicalDiagnosis, setIsMedicalDiagnosis] = useState<boolean>(false);

  const [savePatient, { isLoading: isSaving }] = useSavePatientMutation();
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();

  const { handleSubmit, setValue, watch, register } = useForm<FormData>({
    defaultValues: {
      patient_id: patient_id,
      comments: commentsAndPassault?.comments || "",
      passault: commentsAndPassault?.passault || "",
    },
    mode: "onChange",
  });

  const commentsValue = watch("comments");
  const isLoading = isSaving || isUpdating;

  useEffect(() => {
    if (commentsAndPassault) {
      if (commentsAndPassault.passault === "Yes") {
        setIsMedicalDiagnosis(true);
        setValue("passault", "Yes");
      } else {
        setIsMedicalDiagnosis(false);
        setValue("passault", "No");
      }

      if (commentsAndPassault.comments) {
        setValue("comments", commentsAndPassault.comments);
      }
    }
  }, [commentsAndPassault, setValue]);

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
    setValue("passault", isChecked ? "Yes" : "No", { shouldValidate: true });
  };
/*
  const resetForm = () => {
    reset({
      patient_id,
      comments: "",
      passault: "",
    });
    setSelectedType("");
    setIsMedicalDiagnosis(false);
  };*/

  const onSubmit = async (data: FormData) => {
    try {
      const submitData = {
        patient_id: data.patient_id || patient_id,
        comments: data.comments || "",
        passault: data.passault || "No",
      };

      let response;
      if (isUpdate) {
        response = await updatePatient({
          _id: submitData.patient_id,
          ...submitData,
        }).unwrap();
      } else {
        response = await savePatient(submitData).unwrap();
      }
      if (response?.success) {

        // Success toast
        toast.success("Patient report submitted successfully!", {
          duration: 2000,
          position: "top-right",
        });
        navigate("/doctor/patient");
        // navigate(0)
        //resetForm();
      } else {
        console.warn(" Update failed:", response?.message);
        // Error toast
        toast.error("Failed to submit report. Please try again.", {
          duration: 2000,
          position: "top-right",
        });
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error submitting form:", apiError);
      // Error toast
      toast.error("Failed to submit report. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <>
    <Toaster />
      
    <div onClick={(e) => e.stopPropagation()} id='report-submission-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row gap-4 mb-4 mt-6">
          <AdminFormatList onSelect={handleAdminSelect} />
          <PersonalFormatList onSelect={handlePersonalSelect} />
        </div>

        <Input type="hidden" {...register("patient_id")} />

        <Editor
          value={commentsValue}
          onChange={handleEditorChange}
          placeholder=""
        />

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
           <Input type="hidden" {...register("passault")} />
        </label>

        

        <div className="mt-4">
          <Button
            type="submit"
            color="dark"
            size="size-2"
            loading={isLoading}
            disabled={!isFormValid || isLoading}
          >
            {isLoading
              ? isUpdate
                ? "Updating..."
                : "Submitting..."
              : isUpdate
              ? "Update"
              : "Submit"}
          </Button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ReportSubmissionForm;
