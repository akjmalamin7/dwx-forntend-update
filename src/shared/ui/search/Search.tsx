import { Input, Text } from "@/shared/ui";
import { useEffect, useState } from "react";

type SearchableValue = string | number | boolean | null | undefined;

interface SearchInputProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  onSearch: (filteredData: T[]) => void;
  placeholder?: string;
  debounceTime?: number;
}

const Search = <T extends Record<string, SearchableValue>>({
  data,
  searchFields,
  onSearch,
  placeholder = "Search...",
  debounceTime = 300,
}: SearchInputProps<T>) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), debounceTime);
    return () => clearTimeout(handler);
  }, [query, debounceTime]);

  // Filter logic
  useEffect(() => {
    if (!debouncedQuery) {
      onSearch(data);
      return;
    }

    const lowerQuery = debouncedQuery.toLowerCase();

    const filtered = data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (value !== undefined && value !== null) {
          return String(value).toLowerCase().includes(lowerQuery);
        }
        return false;
      })
    );

    onSearch(filtered);
  }, [debouncedQuery, data, searchFields, onSearch]);

  return (
    <div className="mb-4">
      <Text element="label" className="font-semibold mr-2">
        Search:
      </Text>
      <Input
        size="sm"
        placeholder={placeholder}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded-sm focus:outline-none focus:ring focus:border-blue-400 text-sm w-full"
      />
    </div>
  );
};

export default Search;
