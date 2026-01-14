import type { PATIENT_IMAGE_ITEM_MODEL } from "@/shared/redux/features/agent/patient-view/patientView.types";
import { forwardRef, useMemo, useState } from "react";
import Viewer from "react-viewer";
// import "react-viewer/dist/react-viewer.css";

interface IProps {
  attachments?: PATIENT_IMAGE_ITEM_MODEL[];
}

const XrayImages = forwardRef<HTMLDivElement, IProps>(
  ({ attachments }, ref) => {
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const original_urls = useMemo(() => {
      const images =
        attachments?.map((att) => ({
          src: att.original_url,
        })) ?? [];
      return images;
    }, [attachments]);

    const small_urls = useMemo(() => {
      const images =
        attachments?.map((att) => ({
          patient_id: att.patient_id,
          image: att.small_url,
        })) ?? [];
      return images;
    }, [attachments]);

    // const handleClick = (index: number) => {
    //   setActiveIndex(index);
    //   setVisible(true);
    // };
    const isDesktop = typeof window !== "undefined" && window.innerWidth > 1024;

    const handleClick = (index: number) => {
      if (!isDesktop) return;

      setActiveIndex(index);
      setVisible(true);
    };
    let smallImages: React.ReactNode;
    if (small_urls && small_urls.length > 0) {
      smallImages = small_urls.map((img, index) => (
        <div
          key={index}
          className="w-[100px] h-[100px] border rounded-md border-gray-300 overflow-hidden"
        >
          <img
            src={img.image}
            alt={`Patient X-Ray ${index + 1}`}
            className="object-cover w-full h-full cursor-pointer"
            onClick={() => handleClick(index)}
            loading="lazy"
          />
        </div>
      ));
    } else {
      <div className="text-gray-500">No X-Ray images available</div>;
    }

    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">X-Ray Images</h2>
        <div ref={ref} className="flex gap-4 flex-wrap">
          {smallImages}
        </div>

        <div className="hidden min-[1024px]:block">
          <Viewer
            visible={visible}
            onClose={() => setVisible(false)}
            images={original_urls}
            activeIndex={activeIndex}
            drag={true}
            zoomable={true}
            rotatable={true}
            scalable={true}
            noImgDetails={true}
          />
        </div>
      </div>
    );
  }
);

export default XrayImages;
