import type { PRINT_DOCTOR_COMMENT } from "@/entities/agent/agent-print-patient/model/schema";
import createDOMPurify from "dompurify";
import parse from "html-react-parser";
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

// ✅ Safe wrapper
const sanitizeHTML = (html: string) => {
  if (!DOMPurify) return html;
  return DOMPurify.sanitize(html);
};

export const PrintPatientComment = ({ comments = [] }: IProps) => {
  const printComments = parse(
   sanitizeHTML(String(comments[0]?.comments || ""))
  );
  return <div contentEditable className="text-2xl">{printComments}</div>;
};
