// components/AutocompleteInput.tsx
import { useState, useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface AutocompleteInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  suggestions: string[];
  allSuggestions?: string[];
  onInputChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function AutocompleteInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  suggestions,
  allSuggestions = [],
  onInputChange,
  size = 'sm',
}: AutocompleteInputProps<T>) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [displaySuggestions, setDisplaySuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Update display suggestions based on filtered or all suggestions
  useEffect(() => {
    setDisplaySuggestions(suggestions);
  }, [suggestions]);

  // Close suggestions when clicking outside
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <div className="relative">
            <input
              {...field}
              type="text"
              placeholder={placeholder}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? 'border-red-500' : 'border-gray-300'
              } ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : ''}`}
              onChange={(e) => {
                field.onChange(e);
                onInputChange?.(e.target.value);
                setDisplaySuggestions(suggestions);
                setShowSuggestions(true);
                setHighlightedIndex(-1);
              }}
              onFocus={() => {
                // Show all suggestions when input is focused
                if (allSuggestions.length > 0) {
                  setDisplaySuggestions(allSuggestions);
                  setShowSuggestions(true);
                  setHighlightedIndex(-1);
                }
              }}
              onKeyDown={(e) => {
                if (!showSuggestions || displaySuggestions.length === 0) return;

                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setHighlightedIndex((prev) =>
                    prev < displaySuggestions.length - 1 ? prev + 1 : prev
                  );
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                } else if (e.key === 'Enter' && highlightedIndex >= 0) {
                  e.preventDefault();
                  field.onChange(displaySuggestions[highlightedIndex]);
                  setShowSuggestions(false);
                } else if (e.key === 'Escape') {
                  setShowSuggestions(false);
                }
              }}
              autoComplete="off"
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && displaySuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {displaySuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 cursor-pointer text-sm ${
                      index === highlightedIndex 
                        ? 'bg-blue-100 text-blue-900' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => {
                      field.onChange(suggestion);
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
          {error && (
            <p className="mt-1 text-sm text-red-500">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}