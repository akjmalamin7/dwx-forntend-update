import type { PRINT_DOCTOR_COMMENT } from "@/entities/agent/agent-print-patient/model/schema";
 
import EditorPrint from "@/features/editor/EditorPrint"; 
import { useMemo } from "react";
interface IProps {
  comments: PRINT_DOCTOR_COMMENT[];
} 
  

const sanitizeValue = (raw: string): string => {
  if (!raw) return "";

  // Step 1: decode &lt; &gt; &amp; etc → real HTML
  const txt = document.createElement("textarea");
  txt.innerHTML = raw;
  const decoded = txt.value;

  // Step 2: remove style="" or style=">" or any broken/empty style attributes
  return decoded.replace(/\s*style\s*=\s*["'][^"']*["']/gi, "");
};

 
export const PrintPatientComment = ({ comments = [] }: IProps) => {
 
  const commentsValue = comments[0]?.comments || ""; 
  const cleanedHTML = useMemo(
    () => sanitizeValue(commentsValue),
    [commentsValue]
  );

  if (!cleanedHTML) return null;


  return <div className="text-2xl patientComments"> 
            <EditorPrint
              value={cleanedHTML}
              placeholder="" 
            />
          </div>;
};
