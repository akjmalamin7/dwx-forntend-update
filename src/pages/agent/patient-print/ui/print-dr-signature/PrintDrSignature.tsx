import type { PRINT_COMPLETED_DOCTOR } from "@/shared/redux/features/agent/patient-print/patientPrint.type";
import { Text } from "@/shared/ui";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
interface IProps {
  signature?: PRINT_COMPLETED_DOCTOR;
  passault?: "Yes" | "" | undefined;
}
const PrintDrSignature = ({ signature, passault }: IProps) => {
  let signatureImg = "";
  if (signature?.image) {
    signatureImg = signature?.image[0] ?? "";
  }

  return (
    <div>
      <Text element="p">Signature</Text>
      <Text element="p">________________</Text>

      <div className="start">
        <img src={signatureImg} alt="Logo" className="w-50 mr-4" />
        <Text element="h4" size="xl">
          {signature?.name || ""}
        </Text>
        <Text element="p" size="lg">
          {parse(DOMPurify.sanitize(String(signature?.address) || ""))}
        </Text>
        {passault === "Yes" ? (
          <Text
            element="p"
            size="xl"
            fontWeight="semiBold"
            className="mt-2 italic text-gray-600"
          >
            N.B. This report is for medical diagnosis only, not for legal use
          </Text>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PrintDrSignature;
