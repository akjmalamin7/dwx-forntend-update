import { InputFile, Text } from "@/shared/ui";
import { useState, type ChangeEvent } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface ImageUploadProps<TFieldValues extends FieldValues> {
  label?: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  isNote?: boolean;
  directory?: "signature" | "upload";
}

const ImageUpload = <TFieldValues extends FieldValues>({
  label = "Upload Images",
  name,
  control,
  isNote = true,
  directory = "upload",
}: ImageUploadProps<TFieldValues>) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();

    // timestamp + file extension
    const timestamp = Date.now();
    const ext = file.name.split(".").pop();
    const newFileName = `${timestamp}.${ext}`;
    const renamedFile = new File([file], newFileName, { type: file.type });
    formData.append("image", renamedFile);

    try {
      setError("");
      const response = await fetch(`https://dwxserver.store/${directory}/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.data) return null;

      let url: string;
      if (Array.isArray(data.data)) {
        url = data.data[0];
      } else if (typeof data.data === "string") {
        url = data.data;
      } else {
        console.error("Unexpected upload response:", data.data);
        return null;
      }

      // clean up quotes if present
      return url.replace(/^"|"$/g, "");
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload image. Please try again.");
      return null;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (!files) return;

          setUploading(true);
          const filesArray = Array.from(files);
          const uploadedUrls: string[] = [];

          // instant preview
          setPreviewUrls(filesArray.map((file) => URL.createObjectURL(file)));

          for (let i = 0; i < filesArray.length; i++) {
            const url = await uploadFile(filesArray[i]);
            if (url) uploadedUrls.push(url);
          }

          // update form value
          field.onChange(uploadedUrls);
          setUploading(false);
        };

        return (
          <>
            <div className="col-span-3">
              {label && (
                <Text element="label" className="font-semibold">
                  {label}
                </Text>
              )}
            </div>

            <div className="col-span-9 space-y-2">
              {isNote && (
                <Text element="p" color="danger" size="md" fontWeight="medium">
                  Note: Please upload images first then type patient
                  information. Wait a moment for the preview to appear.
                </Text>
              )}

              <InputFile
                size="sm"
                multiple
                onChange={handleFileChange}
                className="w-full"
                error={{
                  status: !!fieldState.error,
                  message: fieldState.error?.message,
                }}
              />

              {uploading && (
                <Text element="p" size="sm" color="primary">
                  Uploading images...
                </Text>
              )}

              {error && (
                <Text element="p" size="sm" color="danger">
                  {error}
                </Text>
              )}

              {!uploading && previewUrls?.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {field.value.map((url: string, idx: number) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`preview-${idx}`}
                      className="w-18 h-18 object-cover rounded border"
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        );
      }}
    />
  );
};

export default ImageUpload;
