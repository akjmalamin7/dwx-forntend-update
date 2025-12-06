import type { ErrorType, OptionsType } from "@/shared/utils/types/types";
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
  value?: string[]; // selected values
  onSelect?: (values: string[]) => void;
  // onFocus?: (event: FocusEvent<HTMLSelectElement>) => void;
}
const CustomMultiSelect = ({
  label,
  name,
  error,
  options = [],
  value = [],
  disabled,
  loading,
  onSelect,
}: // onFocus,
CustomMultiSelectProps) => {
  const handleSelect = (val: string) => {
    if (!val) return;
    if (!value.includes(val)) {
      onSelect?.([...value, val]);
    }
  };

  const handleRemove = (val: string) => {
    onSelect?.(value.filter((item) => item !== val));
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
        selectedValues={value ?? []}
        options={options}
        onRemove={handleRemove}
      />
      <CustomSelect
        disabled={disabled}
        options={options}
        isMultiSelect
        onSelectedValue={handleSelect}
        loading={loading}
      />
      {error?.status && (
        <Text size="sm" className="text-red-500 mt-1">
          {error.message}
        </Text>
      )}
    </div>
  );
};

export default CustomMultiSelect;
