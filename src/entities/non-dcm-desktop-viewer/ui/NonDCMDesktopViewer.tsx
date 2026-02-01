import type { PATIENT_IMAGE_ITEM_MODEL } from "@/shared/redux/features/agent/patient-view/patientView.types";
import { useMemo, useState } from "react";
import "./NonDCMDesktopViewer.css";
import Viewer from "./Viewer";

interface NonDCMDesktopViewerProps {
  attachments?: PATIENT_IMAGE_ITEM_MODEL[];
}

const NonDCMDesktopViewer = ({
  attachments = [],
}: NonDCMDesktopViewerProps) => {
  const [viewerOpen, setViewerOpen] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);

  const original_urls = useMemo(
    () => attachments?.map((att) => ({ src: att.original_url })),
    [attachments],
  );
  console.log("attachments", original_urls);
  const small_urls = useMemo(
    () => attachments?.map((att) => ({ src: att.small_url })),
    [attachments],
  );

  const openViewer = (i: number): void => {
    setStartIndex(i);
    setViewerOpen(true);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-grid">
        {small_urls.map((img, i) => (
          <div className="gallery-item" key={i} onClick={() => openViewer(i)}>
            <img src={img.src} />
          </div>
        ))}
      </div>

      {viewerOpen && (
        <Viewer
          images={original_urls}
          initialIndex={startIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
};

export default NonDCMDesktopViewer;
