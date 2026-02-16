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

const EditorPrint = ({ 
  placeholder,
  value = "",
  onChange,
  label = " ",
}: IProps) => {
  const editor = useRef(null);

  // Function to remove font-size from HTML content
  const cleanFontSize = (html: string) => {
    return html.replace(/font-size\s*:\s*[^;"\s]+[;"]?/gi, "");
  };

  // Clean the incoming value
  const cleanedValue = useMemo(() => cleanFontSize(value), [value]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "",
      height: 400,
      toolbarAdaptive: false,
      toolbarButtonSize: "middle" as const,

      // Default text style inside editor
      style: {
        fontSize: "24px",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      },

      // Remove font and fontsize buttons from toolbar
      buttons: [
         "fontsize",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font", 
        "|",
        "align",
        "outdent",
        "indent",
        "|",
           
        "preview",
        "fullsize",
      ],
      removeButtons: ["source", "about", "font"],
      showXPathInStatusbar: false,

      // Clean font-size from pasted content
      events: {
        paste: (e: ClipboardEvent) => {
          const clipboardData = e.clipboardData;
          if (clipboardData) {
            const html = clipboardData.getData("text/html");
            if (html) {
              e.preventDefault();
              const cleaned = cleanFontSize(html);
              document.execCommand("insertHTML", false, cleaned);
            }
          }
        },
      },
    }),
    [placeholder]
  );

  // Clean font-size before saving
  const handleBlur = (newContent: string) => {
    const cleanedContent = cleanFontSize(newContent);
    onChange?.(cleanedContent);
  };

  return (
    <>
      {isString(label) ? (
        <Text
          element="label"
          size="md"
          className="mb-2 block print:hidden"
          fontWeight="bold"
        >
          {label}
        </Text>
      ) : (
        label
      )}
      <JoditEditor
        ref={editor}
        value={cleanedValue}
        config={config}
        tabIndex={1}
        onBlur={handleBlur}
      />
    </>
  );
};

export default EditorPrint;