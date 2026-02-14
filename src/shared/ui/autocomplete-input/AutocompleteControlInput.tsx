// shared/ui/AutocompleteControlInput.tsx
import { useState, useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '../input';
 

interface AutocompleteControlInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  size?: 'sm' | 'md' | 'lg';
  getSuggestions: (query: string) => string[];
}

export function AutocompleteControlInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  size = 'sm',
  getSuggestions,
}: AutocompleteControlInputProps<T>) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="col-span-12 md:col-span-6 lg:col-span-3" ref={wrapperRef}>
          <div className="relative">
            <Input
              {...field}
              label={label}
              placeholder={placeholder}
              size={size}
              error={{
                status: !!error,
                message: error?.message as string,
              }}
              onChange={(e) => {
                field.onChange(e);
                const query = e.target.value;
                const newSuggestions = getSuggestions(query);
                setSuggestions(newSuggestions);
                setShowSuggestions(newSuggestions.length > 0);
                setHighlightedIndex(-1);
              }}
              onFocus={() => {
                const allSuggestions = getSuggestions('');
                setSuggestions(allSuggestions);
                if (allSuggestions.length > 0) {
                  setShowSuggestions(true);
                }
                setHighlightedIndex(-1);
              }}
              onKeyDown={(e) => {
                if (!showSuggestions || suggestions.length === 0) return;

                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setHighlightedIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                  );
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                } else if (e.key === 'Enter' && highlightedIndex >= 0) {
                  e.preventDefault();
                  field.onChange({ target: { value: suggestions[highlightedIndex] } });
                  setShowSuggestions(false);
                } else if (e.key === 'Escape') {
                  setShowSuggestions(false);
                }
              }}
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-[#262b40] border border-gray-500 rounded-md shadow-lg max-h-60 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 cursor-pointer text-sm transition-colors ${
                      index === highlightedIndex 
                        ? 'bg-gray-600 text-white' 
                        : 'text-gray-100 hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      field.onChange({ target: { value: suggestion } });
                      setShowSuggestions(false);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
}