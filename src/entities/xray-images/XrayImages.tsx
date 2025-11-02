import type { PATIENT_IMAGE_MODEL } from "@/shared/redux/features/agent/patient-view/patientView.types";
import { forwardRef, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

interface IProps {
  attachments: PATIENT_IMAGE_MODEL[];
}

const XrayImages = forwardRef<HTMLDivElement, IProps>(({ attachments }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const allImages = attachments
    ?.flatMap((att) => att.attachment.flat()) || [];

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
                className="object-cover w-full h-full cursor-pointer"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              />
            </div>
          ))
        ) : (
          <div className="text-gray-500">No X-Ray images available</div>
        )}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={allImages[photoIndex]}
          nextSrc={allImages[(photoIndex + 1) % allImages.length]}
          prevSrc={allImages[(photoIndex + allImages.length - 1) % allImages.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + allImages.length - 1) % allImages.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % allImages.length)
          }
        />
      )}
    </div>
  );
});

export default XrayImages;
