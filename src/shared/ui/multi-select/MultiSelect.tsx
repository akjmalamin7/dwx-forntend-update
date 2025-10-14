import { SelectArrowIcon } from "@/assets/icons";
import React, { useEffect, useState, type ChangeEvent } from "react";
import { Text } from "../text";
import MulitSelectList from "./MulitSelectList";
import type { MultiSelectProps } from "./multiSelect.types";
import { finalSelectClasses } from "./mutliSelect.classes";

const MultiSelect = ({
  bgColor = "transparent",
  className,
  color = "dark",
  label,
  name,
  error,
  options = [],
  radius = "sm",
  size = "lg",
  value = [],
  disabled,
  loading,
  onSelect,
  onFocus,
}: MultiSelectProps, ref: React.Ref<HTMLSelectElement>) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  useEffect(() => {
    setSelectedValues(value);
  }, [value]);
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
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
      {label && (
        <Text className="mb-[14px]">
          <label htmlFor={name}>{label}</label>
        </Text>
      )}

      {/* Selected tags */}
      <MulitSelectList
        selectedValues={selectedValues}
        options={options}
        onRemove={handleRemove}
      />

      {/* Dropdown */}
      <div className="relative w-full">
        <select
          ref={ref}
          id={name}
          name={name}
          disabled={disabled || loading}
          // onSelect={handleSelect}
          onChange={handleSelect}
          onFocus={onFocus}
          className={finalSelectClasses({
            bgColor,
            className,
            color,
            disabled,
            size,
            radius,
          })}
          value=""
        >
          {
            <>
              <option value="">Choose one</option>
              {options
                .filter((opt) => !selectedValues.includes(opt.value))
                .map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-gray-950"
                  >
                    {option.name}
                  </option>
                ))}
            </>
          }
        </select>
        <div className="absolute right-[5px] top-1/2 -translate-y-1/2 flex items-center justify-center">
          <SelectArrowIcon />
        </div>
      </div>

      {/* Error message */}
      {error && error.status && (
        <Text size="sm" fontWeight="regular" color="danger">
          {error.message}
        </Text>
      )}
    </div>
  );
};

MultiSelect.displayName = "MultiSelect";
export default React.forwardRef(MultiSelect);
