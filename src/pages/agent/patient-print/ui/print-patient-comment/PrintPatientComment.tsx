import type { PRINT_DOCTOR_COMMENT } from "@/entities/agent/agent-print-patient/model/schema";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
interface IProps {
  comments: PRINT_DOCTOR_COMMENT[];
}
export const PrintPatientComment = ({ comments = [] }: IProps) => {
  const printComments = parse(
    DOMPurify.sanitize(String(comments[0]?.comments || ""))
  );
  return <div contentEditable className="text-2xl">{printComments}</div>;
};
