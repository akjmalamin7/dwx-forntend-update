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

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // -------- helpers --------

  const getLineValue = (...keys: string[]) => {
    const line = lines.find((l) =>
      keys.some((k) => l.toLowerCase().startsWith(k.toLowerCase()))
    );
    return line ? line.split(":").slice(1).join(":").trim() : "";
  };

  const extractAge = (text?: string): string => {
    if (!text) return "";
    const match = text.match(
      /\b(?:age\s*[:\-]?\s*)?(\d{1,3})\s*(yrs?|years?)\b/i
    );
    return match ? `${match[1]} Yrs` : "";
  };

  const cleanName = (name: string): string => {
    return name
      .replace(/\b(?:age\s*[:\-]?\s*)?\d{1,3}\s*(yrs?|years?)\b/i, "")
      .replace(/\s*[:\-]\s*$/, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // -------- extraction --------

  const rawName = getLineValue("Patient Name", "Patient's Name");

  const age =
    extractAge(getLineValue("Age")) ||
    extractAge(rawName);

  const parsedData: ParsedPatientData = {
    patient_id: getLineValue("Patient ID"),
    name: cleanName(rawName),
    age,
    gender: getLineValue("Sex", "Gender"),
    xray_name: getLineValue("Exposure Menu Name", "Menu Name"),
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
