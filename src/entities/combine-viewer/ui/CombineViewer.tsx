import DwxViewer from "@/entities/dwx-viewer";
import { NonDCMDesktopViewer } from "@/entities/non-dcm-desktop-viewer";
import { ReportSubmissionForm } from "@/entities/report-submission-form";
import XrayMobileImages from "@/entities/xray-mobile-images/ui/XrayMobileImages";
import { useAuth } from "@/shared/hooks";
import type { PATIENT_IMAGE_ITEM_MODEL } from "@/shared/redux/features/agent/patient-view/patientView.types";
import { useMemo, useState } from "react";
interface CombineViewerProps {
  attachments?: PATIENT_IMAGE_ITEM_MODEL[];
  isDCM?: boolean;
  patient_id?: string;
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
}
const CombineViewer = ({
  attachments,
  isDCM,
  patient_id = "",
  visible = false,
  setVisible,
}: CombineViewerProps) => {
  const { role } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const original_urls = useMemo(
    () => attachments?.map((att) => ({ src: att.original_url })),
    [attachments],
  );
  return (
    <>
      <div className="hidden lg:block mt-6 gap-4">
        {isDCM ? (
          <DwxViewer attachments={attachments} />
        ) : (
          <NonDCMDesktopViewer attachments={attachments} />
        )}
        {role === "admin" || role === "user" ? (
          ""
        ) : (
          <div id="report-form">
            <ReportSubmissionForm patient_id={patient_id} />
          </div>
        )}
      </div>

      <div className="lg:hidden mt-6">
        <h4 className="font-bold mb-3 text-gray-700">X-Ray Images</h4>
        <div className="flex gap-3 flex-wrap">
          {attachments?.map((img, i) => (
            <div
              key={i}
              className="w-24 h-24 border rounded-md overflow-hidden cursor-pointer active:scale-95 transition-all shadow-sm"
              onClick={() => {
                setActiveIndex(i);
                setVisible?.(true);
              }}
            >
              <img
                src={img.small_url}
                className="w-full h-full object-cover"
                alt="Thumbnail"
              />
            </div>
          ))}
        </div>
      </div>

      <XrayMobileImages
        isOpen={visible}
        onClose={() => setVisible?.(false)}
        images={original_urls ?? []}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        patient_id={patient_id}
      />
    </>
  );
};

export default CombineViewer;
