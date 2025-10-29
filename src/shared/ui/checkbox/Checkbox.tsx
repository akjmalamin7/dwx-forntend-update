import React, { forwardRef } from "react";
import { Text } from "../text";

interface CheckboxProps extends React.ComponentProps<"input"> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, name, onChange, checked, ...rest }, ref) => {
    return (
      <label className="flex items-center mb-2 gap-2 cursor-pointer">
        <input
          ref={ref}
          name={name}
          type="checkbox"
          checked={checked}
          {...rest}
          onChange={onChange}
          className="w-[14px] h-[14px] text-blue-600 bg-gray-100 border-gray-300 rounded-sm
            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800
            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />

        {label && (
          <Text element="span" size="md">
            {label}
          </Text>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
