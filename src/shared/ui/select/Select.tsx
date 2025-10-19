import { SelectArrowIcon } from "@/assets/icons";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { Text } from "../text";
import type { SelectProps } from "./select.types";

const Select = ({
  bgColor = "transparent",
  className,
  color = "dark",
  //   isLoading,
  label,
  name,
  error,
  options = [],
  radius = "sm",
  size = "lg",
  value,
  disabled,
  onSelect,
  onFocus,
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectedValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onSelect?.(event.target.value);
  };
  useEffect(() => {
    if (!value) {
      setSelectedValue("");
      return;
    }
    setSelectedValue(value);
  }, [value, options]);

  const colorClasses = {
    dark: "text-gray-900",
    light: "h-[30px] xl:h-[38px] text-[14px]",
  }[color];

  const sizeClasses = {
    sm: "h-[30px] xl:h-[38px] text-[14px]",
    md: "h-[36px] xl:h-[44px] text-[14px]",
    lg: "h-[40px] xl:h-[50px] text-[14px]",
  }[size];

  const roundClasses = {
    sm: "rounded-[8px]",
    md: "rounded-[10px]",
    lg: "rounded-[12px]",
  }[radius];

  const bgClasses = {
    dark: "bg-gray-500",
    light: "bg-[#f7f7f708]",
    transparent: "",
  }[bgColor];

  const finalSelectClasses = `border border-gray-500  w-full px-[15px] appearance-none   outline-none ${roundClasses} ${sizeClasses} ${bgClasses} ${colorClasses} ${className}c`;

  return (
    <div className="w-full">
      {label && (
        <Text className="mb-[14px]">
          <label htmlFor={name}>{label}</label>
        </Text>
      )}
      <div className="relative w-full">
        <select
          id={name}
          name={name}
          value={selectedValue}
          disabled={disabled}
          onChange={handleSelectedValue}
          onFocus={onFocus}
          className={finalSelectClasses}
        >
          <option value="">Choose one</option>
          {options?.map((option, index) => (
            <option key={index} value={option.value} className="text-gray-950">
              {option.name}
            </option>
          ))}
        </select>
        <div className="absolute right-[5px] top-1/2 -translate-y-1/2 flex items-center justify-center">
          <SelectArrowIcon />
        </div>
      </div>
      {error && error.status && (
        <Text size="sm" fontWeight="regular" color="danger">
          {error.message}
        </Text>
      )}
    </div>
  );
};

export default Select;
