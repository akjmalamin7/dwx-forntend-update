import { useEffect, useMemo, useState } from "react";
import { Input } from "../input";

// Simple debounce util (no re-renders, stable)
function debounceFunc<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return {
    call: (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    },
    cancel: () => clearTimeout(timer),
  };
}

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

  const debounced = useMemo(() => {
    return debounceFunc((val) => onChange?.(val as string), debounceTime);
  }, [onChange, debounceTime]);

  useEffect(() => {
    debounced.call(internalValue);
    return () => debounced.cancel();
  }, [internalValue, debounced]);

  return (
    <Input
      label="Search:"
      size="sm"
      placeholder={placeholder}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value.toLowerCase())}
    />
  );
};

export default ServerSideSearch;
