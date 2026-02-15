import { useGetReferenceListQuery } from "@/shared/redux/features/agent/reference-list/referenceListApi";
import { CustomSelect, Input, Text } from "@/shared/ui";
import type { ErrorType, OptionsType } from "@/shared/utils/types/types";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";

interface Props {
  label?: string;
  error?: ErrorType;
  value?: string;
  autoComplete?: string;
  name?: string;
  onSelectedValue?: (value: string) => void;
}

const SelectCustomReferenceDoctor = ({
  label = "Test Reference Doctor",
  error,
  value = "",
  onSelectedValue,
  autoComplete = "on",
  name = "ref_doctor",
}: Props) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [selectValue, setSelectValue] = useState<string>();
  const { data: referenceOptions, isLoading } = useGetReferenceListQuery();

  const options: OptionsType[] = useMemo(() => {
    if (!referenceOptions) return [];
    return referenceOptions.map((item) => ({
      name: item.name,
      value: item.id,
    }));
  }, [referenceOptions]);

  useEffect(() => {
    setInputValue(value);
    const defaultOption = options.find(
      (opt) => opt.name.toLowerCase() === value.toLowerCase()
    );
    setSelectValue(defaultOption?.value);
  }, [value, options]);

  const handleSelectChange = useCallback(
    (val: string) => {
      const option = options.find((opt) => opt.value === val);

      if (option && option.value) {
        setSelectValue(val);
        setInputValue(option.name);
        onSelectedValue?.(option.name); // replace option.name to option.value
      } else {
        setSelectValue(undefined);
        setInputValue("");
        onSelectedValue?.("");
      }
    },
    [options, onSelectedValue]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      setInputValue(val);
      onSelectedValue?.(val);

      const match = options.find(
        (opt) => opt.name.toLowerCase() === val.toLowerCase()
      );
      setSelectValue(match?.value);
    },
    [options, onSelectedValue]
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
        {/* Input field */}
        <Input
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Select an option"
          size="sm"
          error={error}
          autoComplete={autoComplete}
        />

        {/* Dropdown select */}
        <CustomSelect
          value={selectValue}
          options={options}
          onSelectedValue={handleSelectChange}
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default SelectCustomReferenceDoctor;
