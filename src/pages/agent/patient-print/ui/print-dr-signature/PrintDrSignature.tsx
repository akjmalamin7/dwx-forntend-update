import type { PRINT_COMPLETED_DOCTOR } from "@/entities/agent/agent-print-patient/model/schema";
import { Text } from "@/shared/ui";
import createDOMPurify from "dompurify";
import parse from "html-react-parser";
interface IProps {
  signature?: PRINT_COMPLETED_DOCTOR;
  passault?: "Yes" | "" | undefined;
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


const PrintDrSignature = ({ signature, passault }: IProps) => {
  let signatureImg = "";
  if (signature?.image) { 
    signatureImg = signature?.image[0] ?? "";
  }

  return (
    <div>
        <p className="font-semibold">Signature:</p>  

      <div className="start">
        <img src={signatureImg} alt="Logo" className="w-30 mr-4" />
        <Text element="h4" size="xl" className="hidden">
          {signature?.name || ""}
        </Text>
        <Text element="p" size="xl">
          {parse(sanitizeHTML(String(signature?.address) || ""))}
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
