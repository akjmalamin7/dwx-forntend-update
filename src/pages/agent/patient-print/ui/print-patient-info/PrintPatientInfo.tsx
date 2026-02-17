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
            <td className="border border-black px-2 py-1 w-2/6 text-xl">
              <Text element="label" className="font-bold text-xl text-capitalize">
                <strong className=" text-2xl ">Patient ID:</strong>
              </Text>{" "}
             <span className="font-normal text-capitalize text-22px">{printPatient?.patient_id || "N/A"}</span>
            </td>
            <td className="border border-black px-2 py-1 w-3/6  text-xl" contentEditable>
              <Text element="label" className="font-bold text-xl">
                <strong className="text-2xl ">Patient Name:</strong>
              </Text>{" "}
              <span className="text-22px">{printPatient?.name || "N/A"}</span>
            </td>
            <td className="border border-black px-2 py-1 w-1/6  text-xl" contentEditable>
              <Text element="label" className="font-bold text-xl">
                <strong className="text-2xl ">Age:</strong>
              </Text>{" "}
             <span className="text-22px"> {printPatient?.age || "N/A"}</span>
            </td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1 text-xl">
              <Text element="label" className="font-bold text-xl">
                <strong className="text-2xl ">Date: </strong>
              </Text>
              <span  className="text-22px">{formatDate(printPatient.createdAt)}</span>
            </td>
            <td className="border border-black px-2 py-1 text-xl">
              <Text element="label" className="font-bold text-xl">
                <strong className="text-2xl ">Print Time: </strong>
              </Text>
             <span className="text-22px">  
              {new Date()
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, "-")}
            {", "}
            {new Date()
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .toUpperCase()}

             </span>
            </td>
            <td className="border border-black px-2 py-1 text-xl" contentEditable>
              <Text element="label" className="font-bold text-xl">
                <strong className="text-2xl ">Sex: </strong>
              </Text>  
              <span className="capitalize text-22px">{printPatient?.gender || "N/A"}</span>
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="border border-black px-2 py-1 text-xl"
              contentEditable
            >
              <Text element="label" className="font-bold text-xl">
                <strong className="text-xl ">Reference By: </strong>
              </Text> 
             <span> {printPatient?.ref_doctor || "N/A"}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrintPatientInfo;
