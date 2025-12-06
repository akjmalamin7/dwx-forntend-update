import type { ErrorType, OptionsType } from "@/shared/utils/types/types";
import { useEffect, useState, type FocusEvent } from "react";
import { CustomSelect } from "../../custom-select";
import MulitSelectList from "../../multi-select/MulitSelectList";
import { Text } from "../../text";

interface CustomMultiSelectProps {
  label?: string;
  name?: string;
  radius?: "sm" | "md" | "lg";
  color?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  options: OptionsType[];
  error?: ErrorType;
  disabled?: boolean;
  loading?: boolean;
  weight?: string;
  value?: string[]; // selected values
  onSelect?: (values: string[]) => void;
  onFocus?: (event: FocusEvent<HTMLSelectElement>) => void;
}
const CustomMultiSelect = ({
  label,
  name,
  error,
  options = [],
  value = [],
  weight,
  disabled,
  loading,
  onSelect,
  onFocus,
}: CustomMultiSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const handleSelect = (val: string) => {
    if (!val) return;
    const selected = val;
    if (!selectedValues.includes(selected)) {
      const newSelectedValues = [...selectedValues, selected];
      setSelectedValues(newSelectedValues);
      onSelect?.(newSelectedValues);
    }
  };
  const handleRemove = (val: string) => {
    const newValues = selectedValues.filter((item) => item !== val);
    setSelectedValues(newValues);
    onSelect?.(newValues);
  };
  return (
    <div className="w-full">
      <div>
        {label && (
          <Text className="mb-[14px]">
            <label htmlFor={name}>{label}</label>
          </Text>
        )}
      </div>
      <MulitSelectList
        selectedValues={selectedValues}
        options={options}
        onRemove={handleRemove}
      />
      <CustomSelect
        options={options}
        isMultiSelect
        onSelectedValue={handleSelect}
        loading={loading}
      />
    </div>
  );
};

export default CustomMultiSelect;
