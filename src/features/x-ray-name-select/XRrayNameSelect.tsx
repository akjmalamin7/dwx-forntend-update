import { useGetXrayNameListQuery } from "@/shared/redux/features/agent/x-ray-name-list/xRayNameListApi";
import { Input, Select, Text } from "@/shared/ui";
import type { ErrorType, OptionsType } from "@/shared/utils/types/types";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";

interface XRrayNameSelectProps {
  label?: string;
  error?: ErrorType;
  onSelectedValue: (val: string) => void;
}

const XRrayNameSelect = forwardRef<HTMLInputElement, XRrayNameSelectProps>(
  ({ label, error, onSelectedValue }, ref) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<string>("");
    const { data: xrayNameListOptions, isLoading } = useGetXrayNameListQuery();

    const options: OptionsType[] = useMemo(() => {
      if (!xrayNameListOptions) return [];
      return xrayNameListOptions.map((item) => ({
        name: item.name,
        value: item.id,
      }));
    }, [xrayNameListOptions]);

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
            error={error}
          />
        </div>
      </>
    );
  }
);

XRrayNameSelect.displayName = "XRrayNameSelect";

export default React.memo(XRrayNameSelect);
