import { Loader, Text } from "@/shared/ui";
import { Card } from "@/shared/ui/card";
import { forwardRef } from "react";

type Opstions = {
  name: string;
  value: string;
};
interface Props {
  options?: Opstions[];
  loading?: boolean;
  onVisible?: (visible: boolean) => void;
  onSelect?: (option: Opstions) => void;
}

const CustomSelectList = forwardRef<HTMLDivElement, Props>(
  ({ loading, options, onVisible, onSelect }, ref) => {
    if (!options) return;

    const handleSelectOption = (option: Opstions) => {
      onSelect?.(option);
      onVisible?.(false);
    };

    if (loading) {
      return (
        <Card className="bg-white shadow shadow-indigo-100 p-4">
          <Loader />
        </Card>
      );
    }

    return (
      <div ref={ref} className="absolute left-0 w-full z-20">
        <Card className="bg-white shadow shadow-indigo-100 py-3">
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                className="h-[32px] px-3 flex items-center hover:bg-[#f7f7f7] lg:cursor-pointer"
                onClick={() => handleSelectOption(option)}
              >
                <Text>{option.name}</Text>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    );
  }
);

export default CustomSelectList;
