import type { PRINT_PATIENT } from "@/shared/redux/features/agent/patient-print/patientPrint.type";
import { Text } from "@/shared/ui";

interface IProps {
  printPatient: PRINT_PATIENT;
}
const PrintPatientInfo = ({ printPatient }: IProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-black mb-4" contentEditable>
        <tbody>
          <tr>
            <td className="border border-black px-2 py-1 w-1/3">
              <Text element="label" className="font-semibold">
                Patient ID:
              </Text>{" "}
              {printPatient?.patient_id || "N/A"}
            </td>
            <td className="border border-black px-2 py-1 w-1/3">
              <Text element="label" className="font-semibold">
                Patient Name:
              </Text>{" "}
              {printPatient?.name || "N/A"}
            </td>
            <td className="border border-black px-2 py-1 w-1/3">
              <Text element="label" className="font-semibold">
                Age:
              </Text>{" "}
              {printPatient?.age || "N/A"}
            </td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-1">
              <Text element="label" className="font-semibold">
                Date:
              </Text>
              {new Date().toLocaleDateString("en-GB")}
            </td>
            <td className="border border-black px-2 py-1">
              <Text element="label" className="font-semibold">
                Print Time:
              </Text>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            <td className="border border-black px-2 py-1">
              <Text element="label" className="font-semibold">
                Sex:
              </Text>{" "}
              {printPatient?.gender || "N/A"}
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="border border-black px-2 py-1">
              <Text element="label" className="font-semibold">
                Reference By:
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
