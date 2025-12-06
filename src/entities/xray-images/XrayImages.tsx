import type { PATIENT_IMAGE_MODEL } from "@/shared/redux/features/agent/patient-view/patientView.types";
import { forwardRef, useMemo, useState } from "react";
import Viewer from "react-viewer";
// import "react-viewer/dist/react-viewer.css";

interface IProps {
  attachments: PATIENT_IMAGE_MODEL[];
}

const XrayImages = forwardRef<HTMLDivElement, IProps>(
  ({ attachments }, ref) => {
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const allImages = useMemo(
      () => attachments?.flatMap((att) => att.attachment).flat() || [],
      [attachments]
    );

    const imageObjects = useMemo(
      () => allImages.map((img) => ({ src: img })),
      [allImages]
    );

    const handleClick = (index: number) => {
      setActiveIndex(index);
      setVisible(true);
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
                  className="object-cover w-full h-full cursor-pointer"
                  onClick={() => handleClick(index)}
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            <div className="text-gray-500">No X-Ray images available</div>
          )}
        </div>

        <Viewer
          visible={visible}
          onClose={() => setVisible(false)}
          images={imageObjects}
          activeIndex={activeIndex}
          drag={true}
          zoomable={true}
          rotatable={true}
          scalable={true}
          noImgDetails={true}
        />
      </div>
    );
  }
);

export default XrayImages;
