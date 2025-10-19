import { Text } from "@/shared/ui";
import JoditEditor from "jodit-react";
import { useMemo, useRef } from "react";

interface IProps {
  placeholder?: string;
  value?: string;
  onChange?: (content: string) => void;
  label?: string;
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
      placeholder: placeholder || "Start typing...",
      height: 400,
      toolbarAdaptive: false,
      toolbarButtonSize: "middle" as const,
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
    [placeholder]
  );

  return (
    <>
      <Text element="label" size="md" className="mb-2 block" fontWeight="bold">
        {label}
      </Text>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => onChange?.(newContent)} // শুধু onBlur ব্যবহার
      />
    </>
  );
};

export default Editor;
