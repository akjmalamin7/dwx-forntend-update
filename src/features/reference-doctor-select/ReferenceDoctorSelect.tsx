import { useGetReferenceListQuery } from "@/shared/redux/features/agent/reference-list/referenceListApi";
import { Input, Select, Text } from "@/shared/ui";
import type { ErrorType, OptionsType } from "@/shared/utils/types/types";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";

interface ReferenceDoctorSelectProps {
  label?: string;
  error?: ErrorType;
  value?: string;
  onSelectedValue: (val: string) => void;
}

const ReferenceDoctorSelect = forwardRef<
  HTMLInputElement,
  ReferenceDoctorSelectProps
>(({ label, value = "", error, onSelectedValue }, ref) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const { data: referenceOptions, isLoading } = useGetReferenceListQuery();

  const options: OptionsType[] = useMemo(() => {
    if (!referenceOptions) return [];
    return referenceOptions.map((item) => ({
      name: item.name,
      value: item.id,
    }));
  }, [referenceOptions]);

  // Memoize option map for fast lookup
  const optionMap = useMemo(() => {
    const map: Record<string, string> = {};
    options.forEach((opt) => (map[opt.name.toLowerCase()] = opt.value));
    return map;
  }, [options]);

  useEffect(() => {
    if (!value) {
      setSelectedValue("");
      setInputValue("");
      return;
    }
    const matchedOption = options.find((opt) => opt.value === value);
    if (matchedOption) {
      setSelectedValue(value);
      setInputValue(matchedOption.name);
    } else {
      setSelectedValue("");
      setInputValue(value);
    }
  }, [value, options]);
  const handleSelectChange = useCallback(
    (val: string) => {
      const option = options.find((opt) => opt.value === val);
      if (option && option.value) {
        setSelectedValue(val);
        setInputValue(option.name);
        onSelectedValue(option.name);
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
      } else {
        setSelectedValue("");
        onSelectedValue(val.trim());
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
          error={error}
        />
        <Select
          size="sm"
          value={selectedValue}
          onSelect={handleSelectChange}
          options={options}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </>
  );
});

ReferenceDoctorSelect.displayName = "ReferenceDoctorSelect";

export default React.memo(ReferenceDoctorSelect);
