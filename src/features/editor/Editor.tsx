import { Text } from "@/shared/ui";
import JoditEditor from "jodit-react";
import isString from "lodash/isString";
import { useMemo, useRef } from "react";

interface IProps {
  placeholder?: string;
  value?: string;
  onChange?: (content: string) => void;
  label?: React.ReactNode | string;
}

const Editor = ({
  placeholder,
  value = "",
  onChange,
  label = "Doctor Comments",
}: IProps) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "",
      height: 400,
      toolbarAdaptive: false,
      toolbarButtonSize: "middle" as const,

      // ⭐ Add this part
      style: {
        fontSize: "18px", // default text size inside editor
        fontFamily: "Arial, sans-serif",
      },

      // ⭐ Control font size dropdown values
      controls: {
        fontsize: {
          list: {
            12: "12",
            14: "14",
            16: "16",
            18: "18",
            20: "20",
            24: "24",
            28: "28",
            32: "32",
          },
        },
      },

      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "align",
        "outdent",
        "indent",
        "|",
        "link",
        "image",
        "|",
        "undo",
        "redo",
        "|",
        "preview",
        "fullsize",
      ],
      removeButtons: ["source", "about"],
      showXPathInStatusbar: false,
    }),
    [placeholder],
  );

  return (
    <>
      {isString(label) ? (
        <Text
          element="label"
          size="md"
          className="mb-2 block"
          fontWeight="bold"
        >
          {label}
        </Text>
      ) : (
        label
      )}
      <div
        className="
    [&_.jodit-wysiwyg]:!text-[36px]
    [&_.jodit-wysiwyg_p]:!text-[36px]
  "
      >
        <JoditEditor
          ref={editor}
          value={value}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => onChange?.(newContent)}
        />
      </div>
    </>
  );
};

export default Editor;
