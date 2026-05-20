import type { PRINT_DOCTOR_COMMENT } from "@/entities/agent/agent-print-patient/model/schema";
 
import EditorPrint from "@/features/editor/EditorPrint"; 

interface IProps {
  comments: PRINT_DOCTOR_COMMENT[];
} 
  
/*
const sanitizeValue = (raw: string): string => {
  if (!raw) return "";

  
  const txt = document.createElement("textarea");
  txt.innerHTML = raw;
  const decoded = txt.value;

  return decoded.replace(/\s*style\s*=\s*["'][^"']*["']/gi, "");
};*/

 
export const PrintPatientComment = ({ comments = [] }: IProps) => {
 
  const commentsValue = comments[0]?.comments || ""; 
  /*const cleanedHTML = useMemo(
    () => sanitizeValue(commentsValue),
    [commentsValue]
  );*/

  if (!commentsValue) return null;


  return <div className="text-2xl patientComments"> 
            <EditorPrint
              value={commentsValue}
              placeholder="" 
            />
          </div>;
};
