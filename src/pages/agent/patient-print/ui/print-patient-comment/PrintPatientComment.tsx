import type { PRINT_DOCTOR_COMMENT } from "@/entities/agent/agent-print-patient/model/schema";
 
import EditorPrint from "@/features/editor/EditorPrint";
import createDOMPurify from "dompurify";
 
interface IProps {
  comments: PRINT_DOCTOR_COMMENT[];
}

 // Next.js safe DOMPurify instance
const DOMPurify =
  typeof window !== "undefined"
    ? createDOMPurify(window)
    : null;

// Remove font-size from inline styles
DOMPurify?.addHook("uponSanitizeAttribute", (_node, data) => {
  if (data.attrName === "style" && data.attrValue) {
    data.attrValue = data.attrValue.replace(
      /font-size\s*:[^;]+;?/gi,
      ""
    );
  }
});

 
 
export const PrintPatientComment = ({ comments = [] }: IProps) => {
 
  const commentsValue = comments[0]?.comments || "";

  return <div   className="text-2xl"> 
   <EditorPrint
            value={commentsValue} 
            placeholder=""
            
          />
          </div>;
};
