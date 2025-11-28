import { useEffect, useState } from "react";
import { Input } from "../input";

interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

const ServerSideSearch = ({
  value = "",
  onChange,
  placeholder = "Search...",
  debounceTime = 500,
}: SearchProps) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange?.(internalValue);
    }, debounceTime);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalValue]);

  return (
    <Input
      label="Search:"
      size="sm"
      placeholder={placeholder}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
    />
  );
};

export default ServerSideSearch;
