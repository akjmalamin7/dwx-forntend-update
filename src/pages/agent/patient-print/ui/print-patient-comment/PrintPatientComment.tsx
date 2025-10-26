import type { PRINT_DOCTOR_COMMENT } from "@/shared/redux/features/agent/patient-print/patientPrint.type";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
interface IProps {
  comments: PRINT_DOCTOR_COMMENT[];
}
export const PrintPatientComment = ({ comments = [] }: IProps) => {
  const printComments = parse(
    DOMPurify.sanitize(String(comments[0]?.comments || ""))
  );
  return <div>{printComments}</div>;
};
