import type { OptionsType } from "@/shared/utils/types/types";
import React from "react";
import Badge from "../badge/Badge";

interface MultiSelectTagsProps {
  selectedValues: string[];
  options: OptionsType[];
  onRemove?: (val: string) => void;
}

const MultiSelectList: React.FC<MultiSelectTagsProps> = ({
  selectedValues,
  options,
  onRemove,
}) => {
  if (selectedValues.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {selectedValues.map((val) => {
        const option = options.find((o) => o.value === val);
        return (
          <Badge
            key={val}
            text={option?.name ?? val}
            variation="on-close"
            onClose={() => onRemove?.(val)}
          />
        );
      })}
    </div>
  );
};

export default React.memo(MultiSelectList);
