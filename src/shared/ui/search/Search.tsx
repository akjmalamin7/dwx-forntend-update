import { Input, Text } from "@/shared/ui";
import { useEffect, useState } from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

const Search = ({
  value,
  onChange,
  placeholder = "Search...",
  debounceTime = 300,
}: SearchProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [localValue, debounceTime, onChange]);

  return (
    <div className="mb-4">
      <Text element="label" className="font-semibold mr-2">
        Search:
      </Text>
      <Input
        size="sm"
        placeholder={placeholder}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded-sm focus:outline-none focus:ring focus:border-blue-400 text-sm w-full"
      />
    </div>
  );
};

export default Search;
