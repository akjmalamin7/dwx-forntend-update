import { SelectArrowIcon } from "@/assets/icons";
import { Input } from "@/shared/ui";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import CustomSelectList from "./CustomSelectList";

type Option = {
  name: string;
  value: string;
};

interface Props {
  options?: Option[];
  loading?: boolean;
  value?: string;
  isMultiSelect?: boolean;
  disabled?: boolean;
  onSelectedValue?: (value: string) => void;
}

const SPACING = 8;
const VIEWPORT_PADDING = 8;

const CustomSelect = ({
  loading,
  value,
  options = [],
  disabled,
  isMultiSelect,
  onSelectedValue,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [visible, setVisible] = useState(false);
  const [optionsData, setOptionsData] = useState<Option[]>(options);
  const [selectedValue, setSelectedValue] = useState<string>(value || "");
  const [inputValue, setInputValue] = useState<string>("");
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    width: number;
  }>({
    top: -100,
    left: 10,
    width: 0,
  });

  // -------------------------
  // Input Change
  // -------------------------
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (!val.trim()) {
      setOptionsData(options);
      if (!isMultiSelect) {
        setSelectedValue("");
        onSelectedValue?.("");
      }
      return;
    }

    const filtered = options.filter((op) =>
      op.name.toLowerCase().includes(val.toLowerCase())
    );
    setOptionsData(filtered);

    if (!isMultiSelect) {
      const exactMatch = options.find((op) => op.name === val);
      if (exactMatch) {
        setSelectedValue(exactMatch.value);
        onSelectedValue?.(exactMatch.value);
      }
    }
  };

  const handleFocus = () => {
    setOptionsData(options);
    setVisible(true);
  };

  // -------------------------
  // Select Option
  // -------------------------
  const handleSelect = (option: Option) => {
    setSelectedValue(option.value);
    setInputValue(isMultiSelect ? "" : option.name);
    setOptionsData(options);
    setVisible(false);
    onSelectedValue?.(option.value);
  };

  // -------------------------
  // Keyboard Navigation
  // -------------------------
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

  // -------------------------
  // Set default value
  // -------------------------
  useEffect(() => {
    if (!value) {
      setSelectedValue("");
      setInputValue("");
      return;
    }
    const def = options.find((opt) => opt.value === value);
    setSelectedValue(value);
    setInputValue(def?.name || "");
  }, [value, options]);

  // -------------------------
  // Close on outside click
  // -------------------------
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (inputRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;

      setVisible(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // -------------------------
  // Dropdown Position
  // -------------------------
  const calculateMenuPosition = () => {
    if (!inputRef.current || !dropdownRef.current) return;

    const inputRect = inputRef.current.getBoundingClientRect();
    const menuRect = dropdownRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const spaceBelow = vh - inputRect.bottom;

    const placeBelow = spaceBelow >= menuRect.height + SPACING;

    const top = placeBelow
      ? inputRect.bottom + SPACING + window.scrollY - 6
      : inputRect.top - menuRect.height - SPACING + window.scrollY + 6;

    const left = Math.min(
      Math.max(inputRect.left + window.scrollX, VIEWPORT_PADDING),
      vw - menuRect.width - VIEWPORT_PADDING
    );

    const width = inputRect.width; // ⭐ MATCH WIDTH

    setMenuPosition({ top, left, width });
  };

  useEffect(() => {
    if (!visible) return;

    requestAnimationFrame(() => calculateMenuPosition());

    window.addEventListener("resize", calculateMenuPosition);
    window.addEventListener("scroll", calculateMenuPosition);

    return () => {
      window.removeEventListener("resize", calculateMenuPosition);
      window.removeEventListener("scroll", calculateMenuPosition);
    };
  }, [visible]);

  return (
    <div className="relative">
      <div className="relative" ref={wrapperRef}>
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
        <div className="absolute right-[5px] top-1/2 -translate-y-1/2 flex items-center">
          <SelectArrowIcon />
        </div>
      </div>

      {visible &&
        createPortal(
          <div
            data-select={selectedValue}
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: menuPosition.top,
              left: menuPosition.left,
              minWidth: menuPosition.width,
              zIndex: 9999,
              pointerEvents: "auto",
            }}
          >
            <CustomSelectList
              onVisible={setVisible}
              options={optionsData}
              onSelect={handleSelect}
              loading={loading}
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default CustomSelect;
