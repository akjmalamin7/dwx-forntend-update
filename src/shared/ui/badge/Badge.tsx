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
        className="flex items-center bg-blue-100 text-blue-800 px-3 py-[2px] rounded-full"
      >
        {text && <Text size="sm">{text}</Text>}
        {variation === "on-close" && (
          <button
            type="button"
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
