import { useGetPatientHistoryListQuery } from "@/shared/redux/features/agent/patient-history/patientHistoryApi";
import { Input, Select, Text } from "@/shared/ui";
import type { OptionsType } from "@/shared/utils/types/types";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";

interface ReferenceDoctorSelectProps {
  label?: string;
  onSelectedValue: (val: string) => void;
}

const ReferenceDoctorSelect = forwardRef<
  HTMLInputElement,
  ReferenceDoctorSelectProps
>(({ label, onSelectedValue }, ref) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { data: patientHistoryOptions, isLoading } = useGetPatientHistoryListQuery()

  const options: OptionsType[] = useMemo(() => {
    if (!patientHistoryOptions) return [];
    return patientHistoryOptions.map((item) => ({ name: item.name, value: item.id }))

  }, [patientHistoryOptions])

  // Memoize option map for fast lookup
  const optionMap = useMemo(() => {
    const map: Record<string, string> = {};
    options.forEach((opt) => (map[opt.name.toLowerCase()] = opt.value));
    return map;
  }, [options]);

  const handleSelectChange = useCallback(
    (val: string) => {
      const option = options.find((opt) => opt.value === val);
      if (option && option.value) {
        setSelectedValue(val);
        setInputValue(option.name);
        onSelectedValue(val);
      } else {
        setSelectedValue("");
        setInputValue("");
        onSelectedValue("");
      }
    },
    [options, onSelectedValue]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      setInputValue(val);

      const matchValue = optionMap[val.trim().toLowerCase()] || "";
      if (matchValue !== selectedValue) {
        setSelectedValue(matchValue);
        onSelectedValue(matchValue);
      }
    },
    [optionMap, selectedValue, onSelectedValue]
  );


  return (
    <>
      <div className="col-span-3">
        {label && (
          <Text element="label" className="font-semibold">
            {label}
          </Text>
        )}
      </div>
      <div className="col-span-9 grid grid-cols-2 gap-2">
        <Input
          ref={ref}
          value={inputValue}
          placeholder={label ?? "Select an option"}
          onChange={handleInputChange}
          size="sm"
        />
        <Select
          size="sm"
          value={selectedValue}
          onSelect={handleSelectChange}
          options={options}
          isLoading={isLoading}
        />
      </div>
    </>
  );
});

ReferenceDoctorSelect.displayName = "ReferenceDoctorSelect";

export default React.memo(ReferenceDoctorSelect);
