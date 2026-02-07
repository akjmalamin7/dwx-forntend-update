import type { PRINT_PATIENT } from "@/entities/agent/agent-print-patient/model/schema";
import { Text } from "@/shared/ui";
import { formatDate } from "@/shared/utils/date-format/dateTime";

interface IProps {
  printPatient: PRINT_PATIENT;
}
const PrintPatientInfo = ({ printPatient }: IProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-black mb-4">
        <tbody>
          <tr>
            <td className="border border-black px-2 py-1 w-1/3 text-xl">
              <Text element="label" className="font-bold text-xl text-capitalize">
                <strong className=" text-xl ">Patient ID:</strong>
              </Text>{" "}
             <span className="font-normal text-capitalize">{printPatient?.patient_id || "N/A"}</span>
            </td>
            <td className="border border-black px-2 py-1 w-1/3  text-xl" contentEditable>
              <Text element="label" className="font-bold text-xl">
                <strong className="text-xl ">Patient Name:</strong>
              </Text>{" "}
              {printPatient?.name || "N/A"}
            </td>
            <td className="border border-black px-2 py-1 w-1/3  text-xl" contentEditable>
              <Text element="label" className="font-bold text-xl">
                <strong className="text-xl ">Age:</strong>
              </Text>{" "}
              {printPatient?.age || "N/A"}
            </td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1 text-xl">
              <Text element="label" className="font-bold text-xl">
                <strong className="text-xl ">Date: </strong>
              </Text>
              {formatDate(printPatient.createdAt)}
            </td>
            <td className="border border-black px-2 py-1 text-xl">
              <Text element="label" className="font-bold text-xl">
                <strong className="text-xl ">Print Time: </strong>
              </Text>
              {new Date().toLocaleDateString("en-GB")}
              {", "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            <td className="border border-black px-2 py-1 text-xl" contentEditable>
              <Text element="label" className="font-bold text-xl">
                <strong className="text-xl ">Sex:</strong>
              </Text>{" "}
              {printPatient?.gender || "N/A"}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="border border-black px-2 py-1 text-xl"
              contentEditable
            >
              <Text element="label" className="font-bold text-xl">
                <strong className="text-xl ">Reference By:</strong>
              </Text>{" "}
              {printPatient?.ref_doctor || "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrintPatientInfo;
