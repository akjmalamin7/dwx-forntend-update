import type { PRINT_DOCTOR_COMMENT } from "@/entities/agent/agent-print-patient/model/schema";
 
import EditorPrint from "@/features/editor/EditorPrint"; 
interface IProps {
  comments: PRINT_DOCTOR_COMMENT[];
} 
 
 
export const PrintPatientComment = ({ comments = [] }: IProps) => {
 
  const commentsValue = comments[0]?.comments || "";

  return <div   className="text-2xl patientComments"> 
   <EditorPrint
            value={commentsValue} 
            placeholder=""
            
          />
          </div>;
};
