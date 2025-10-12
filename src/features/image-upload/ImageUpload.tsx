import { InputFile, Text } from "@/shared/ui";
import { useState, type ChangeEvent } from "react";

interface ImageUploadProps {
  onImagesUpload?: (urls: string[]) => void;
  values?: string[];
}

const ImageUpload = ({ onImagesUpload, values = [] }: ImageUploadProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>(values);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setError("");
      const response = await fetch("https://dwxserver.store/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server response:", text);
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.data || null;
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload image. Please try again.");
      return null;
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];
    const previews: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      previews.push(URL.createObjectURL(file));

      const uploadedUrl = await uploadFile(file);
      if (uploadedUrl) uploadedUrls.push(uploadedUrl);
    }

    setPreviewUrls(previews);
    onImagesUpload?.(uploadedUrls);
    setUploading(false);
  };

  return (
    <>
      <div className="col-span-3">
        <Text element="label" className="font-semibold">
          Upload Images
        </Text>
      </div>

      <div className="col-span-9 space-y-2">
        <Text element="p" color="danger" size="md" fontWeight="medium">
          Note: Please upload images first then type patient information. Wait a
          moment for the preview to appear.
        </Text>

        <InputFile size="sm"
          multiple
          onChange={handleFileChange}
          className="w-full"
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

        {previewUrls.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {previewUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
