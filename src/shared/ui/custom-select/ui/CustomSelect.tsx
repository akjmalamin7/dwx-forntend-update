import { SelectArrowIcon } from "@/assets/icons";
import { Input } from "@/shared/ui";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import CustomSelectList from "./CustomSelectList";

type Opstions = {
  name: string;
  value: string;
};

interface Props {
  options?: Opstions[];
  loading?: boolean;
  value?: string;
  isMultiSelect?: boolean;
  disabled?: boolean;
  onSelectedValue?: (value: string) => void;
}

const CustomSelect = ({
  loading,
  value,
  options = [],
  disabled,
  isMultiSelect,
  onSelectedValue,
}: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [visible, setVisible] = useState(false);
  const [optionsData, setOptionsData] = useState<Opstions[]>(options);
  const [selectedValue, setSelectedValue] = useState<string>(value || "");
  const [inputValue, setInputValue] = useState<string>("");
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (!val.trim()) {
      setOptionsData(options);
      setSelectedValue("");
      onSelectedValue?.("");
      return;
    }

    const filtered = options.filter((op) =>
      op.name.toLowerCase().includes(val.toLowerCase())
    );
    setOptionsData(filtered);

    const exactMatch = options.find((op) => op.name === val);
    if (exactMatch) {
      setSelectedValue(exactMatch.value);
      onSelectedValue?.(exactMatch.value);
    }
  };

  const handleFocus = () => {
    setOptionsData(options);
    setVisible(true);
  };

  // Selecting from list
  const handleSelect = (option: Opstions) => {
    setSelectedValue(option.value);
    if (isMultiSelect) {
      setInputValue("");
    } else {
      setInputValue(option.name);
    }
    setOptionsData(options);
    setVisible(true);
    onSelectedValue?.(option.value);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!visible || optionsData.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < optionsData.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : optionsData.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < optionsData.length) {
        handleSelect(optionsData[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setVisible(false);
    }
  };
  useEffect(() => {
    if (!value) {
      setSelectedValue("");
      setInputValue("");
      return;
    }
    const defaultOption = options.find((opt) => opt.value === value);
    setSelectedValue(value);
    setInputValue(defaultOption?.name || "");
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInput = inputRef.current?.contains(target);
      const clickedList = listRef.current?.contains(target);
      if (clickedInput || clickedList) return;
      setVisible(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Choose one"
          size="sm"
          disabled={disabled}
        />
        <div className="absolute right-[5px] top-1/2 -translate-y-1/2 flex items-center justify-center">
          <SelectArrowIcon />
        </div>
      </div>
      {visible && (
        <CustomSelectList
          default-select={selectedValue}
          ref={listRef}
          onVisible={setVisible}
          options={optionsData}
          onSelect={handleSelect}
          loading={loading}
        />
      )}
    </div>
  );
};

export default CustomSelect;
