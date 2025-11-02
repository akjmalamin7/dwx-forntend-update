import type { PATIENT_IMAGE_MODEL } from "@/shared/redux/features/agent/patient-view/patientView.types";
import { forwardRef, useMemo, useState } from "react";
import ImageViewer from "react-simple-image-viewer";

interface IProps {
  attachments: PATIENT_IMAGE_MODEL[];
}

const XrayImages = forwardRef<HTMLDivElement, IProps>(({ attachments }, ref) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const allImages = useMemo(
    () => attachments?.flatMap((att) => att.attachment.flat()) || [],
    [attachments]
  );

  const openImageViewer = (index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">X-Ray Images</h2>

      <div ref={ref} className="flex gap-4 flex-wrap">
        {allImages.length > 0 ? (
          allImages.map((img, index) => (
            <div
              key={index}
              className="w-[100px] h-[100px] border rounded-md border-gray-300 overflow-hidden"
            >
              <img
                src={img}
                alt={`Patient X-Ray ${index + 1}`}
                className="object-cover w-full h-full cursor-pointer hover:opacity-80 transition"
                onClick={() => openImageViewer(index)}
              />
            </div>
          ))
        ) : (
          <div className="text-gray-500">No X-Ray images available</div>
        )}
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={allImages}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
          backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.9)" }}
        />
      )}
    </div>
  );
});

export default XrayImages;
