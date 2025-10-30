import type { PATIENT_IMAGE_MODEL } from "@/shared/redux/features/agent/patient-view/patientView.types";
import { forwardRef } from "react";
import { Fragment } from "react/jsx-runtime";

interface IProps {
  attachments: PATIENT_IMAGE_MODEL[];
}
const XrayImages = forwardRef<HTMLDivElement, IProps>(
  ({ attachments }, ref) => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">X-Ray Images</h2>
        <div ref={ref} className="flex gap-4 flex-wrap">
          {attachments && attachments.length > 0 ? (
            attachments.map((attachment) => (
              <Fragment key={attachment._id}>
                {attachment.attachment.flat().map((img, index) => (
                  <div
                    key={`${attachment._id}-${index}`}
                    className=" w-[100px] h-[100px] border rounded-md  border-gray-300 "
                  >
                    <img
                      src={img}
                      alt={`Patient X-Ray ${index + 1}`}
                      className="object-cover w-full h-full cursor-pointer"
                    />
                  </div>
                ))}
              </Fragment>
            ))
          ) : (
            <div className="text-gray-500">No X-Ray images available</div>
          )}
        </div>
      </div>
    );
  }
);

export default XrayImages;
