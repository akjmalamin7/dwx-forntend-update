import { Loader, Text } from "@/shared/ui";
import { Card } from "@/shared/ui/card";
import { forwardRef, useEffect, useRef } from "react";

type Options = {
  name: string;
  value: string;
};
interface Props {
  options?: Options[];
  loading?: boolean;
  highlightIndex: number;
  onVisible?: (visible: boolean) => void;
  onSelect?: (option: Options) => void;
}

const CustomSelectList = forwardRef<HTMLDivElement, Props>(
  ({ loading, options, highlightIndex, onVisible, onSelect }, ref) => {
    const listRef = useRef<HTMLUListElement>(null);

    const handleSelectOption = (option: Options) => {
      onSelect?.(option);
      onVisible?.(false);
    };

    useEffect(() => {
      if (highlightIndex >= 0 && listRef.current) {
        const highlightedElement = listRef.current.children[
          highlightIndex
        ] as HTMLElement;
        if (highlightedElement) {
          highlightedElement.scrollIntoView({
            block: "nearest",
          });
        }
      }
    }, [highlightIndex]);
    if (!options) return;

    if (loading) {
      return (
        <Card className="bg-white shadow shadow-indigo-100 p-4">
          <Loader />
        </Card>
      );
    }

    return (
      <div ref={ref} className="left-0 w-full z-20">
        <Card className="bg-white shadow shadow-indigo-100 py-3">
          <ul ref={listRef} className="max-h-[300px] overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={option.value}
                value={option.value}
                // className="h-[32px] px-3 flex items-center hover:bg-[#f7f7f7] lg:cursor-pointer"
                className={`h-[32px] px-3 flex items-center lg:cursor-pointer transition-colors ${
                  index === highlightIndex
                    ? "bg-indigo-50"
                    : "hover:bg-[#f7f7f7]"
                }`}
                onClick={() => handleSelectOption(option)}
              >
                <Text
                  className={
                    index === highlightIndex ? "text-blue-600 font-medium" : ""
                  }
                >
                  {option.name}
                </Text>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    );
  },
);

export default CustomSelectList;
