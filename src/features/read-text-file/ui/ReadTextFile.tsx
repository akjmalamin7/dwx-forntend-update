import { Input, Text } from "@/shared/ui";
import type { ChangeEvent } from "react";
export interface ParsedPatientData {
  patient_id: string;
  name: string;
  age: string;
  gender: string;
  xray_name: string;
}

interface ReadTextFileProps {
  onParsed?: (data: ParsedPatientData) => void;
  setIndex?: number;
}
const ReadTextFile = ({ onParsed, setIndex }: ReadTextFileProps) => {
  const handleFileRead = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "text/plain") {
      alert("Only .text file allowed!");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;

      const lines = text.split("\n").map((l) => l.trim());

      const getAgeString = (str: string) => {
        const match = str.match(/\d+\s*[A-Za-z]+/);
        return match ? match[0] : null;
      };

      let getAge: string = "";

      const getValue = (...keys: string[]) => {
        for (const key of keys) {
          const line = lines.find((l) =>
            l.toLowerCase().startsWith(key.toLowerCase())
          );
          if (!getAge) {
            getAge = getAgeString(line as string) || "";
          }
          if (line) return line.split(":")[1]?.trim() || "";
        }
        return "";
      };
      const parsedData: ParsedPatientData = {
        patient_id: getValue("Patient ID"),
        name: getValue("Patient Name", "Patient's Name"),
        age: getValue("Age") || getAge,
        gender: getValue("Sex", "Gender"),
        xray_name: getValue("Exposure Menu Name", "Menu Name"),
      };
      onParsed?.(parsedData);
    };
    reader.readAsText(file);
  };
  return (
    <>
      <div className="col-span-3">
        <Text element="label" className="font-semibold">
          Patient Information File [.txt file only]
        </Text>
      </div>
      <div className="col-span-9">
        <Input
          key={setIndex}
          size="sm"
          type="file"
          onChange={handleFileRead}
          className="border rounded w-full"
        />
      </div>
    </>
  );
};

export default ReadTextFile;
