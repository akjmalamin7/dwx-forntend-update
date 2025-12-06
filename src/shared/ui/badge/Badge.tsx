import { CrossIcon } from "@/assets/icons";
import React, { forwardRef } from "react";
import { Text } from "../text";

interface BadgeProps extends React.ComponentProps<"div"> {
  text?: string;
  variation?: "on-close" | "default";
  onClose?: () => void;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ text, variation = "default", onClose, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        className="flex items-center group bg-gray-50 border border-gray-500 text-blue-800 px-3 py-[2px] rounded-[2px] "
      >
        {text && (
          <Text size="sm" className="uppercase">
            {text}
          </Text>
        )}
        {variation === "on-close" && (
          <button
            type="button"
            className="group-hover:bg-gray-300! transition-colors"
            onClick={onClose}
            style={{
              marginLeft: "0.5rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <CrossIcon size="14" />
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
