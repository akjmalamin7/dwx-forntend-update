import { Panel, PanelHeading, Text } from "@/shared/ui"; 
import XRAY_FLIM from "@/assets/images/xray-flim.png";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import { useEffect, useRef } from "react";
const PatientView = () => { 

   const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<Viewer | null>(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerInstance.current = new Viewer(viewerRef.current, {
        inline: false,
        navbar: false,
        toolbar: {
          zoomIn: 1,
          zoomOut: 1,
          reset: 1,
          oneToOne: 1,
          prev: 1,
          play: 0,
          next: 1,
          rotateLeft: 1,
          rotateRight: 1,
          flipHorizontal: 1,
          flipVertical: 1,
        },
        title: false,
      });
    }

    return () => {
      viewerInstance.current?.destroy();
    };
  }, []);


  return ( 

      <Panel
        header={
          <PanelHeading
            title="Patient View"
            button="Back to Patient List"
            path="/agent/patient-completed"
          />
        }
        size="lg"
      >
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-black mb-4">
            <tbody>
              <tr>
                <td className="border border-black px-2 w-1/3">
                  <Text element="label" className="font-semibold">Patient ID:</Text> P-101
                </td>
                <td className="border border-black px-2  w-1/3">
                  <Text element="label" className="font-semibold">Patient Name:</Text> Miraz
                </td>
                <td className="border border-black px-2   w-1/3">
                  <Text element="label" className="font-semibold">Age:</Text> 24y
                </td>
              </tr>
              <tr>
                <td className="border border-black px-2">
                  <Text element="label" className="font-semibold">Date:</Text>  
                  {new Date().toLocaleDateString('en-GB')}
                </td>
                <td className="border border-black px-2">
                  <Text element="label" className="font-semibold">History:</Text> 
                   Pain
                </td>
                <td className="border border-black px-2">
                  <Text element="label" className="font-semibold">Sex:</Text> Male
                </td>
              </tr>
              <tr>
                <td className="border border-black px-2">
                  <Text element="label" className="font-semibold">Xray Name:</Text> Chest
                </td>
                <td colSpan={2} className="border border-black px-2">
                  <Text element="label" className="font-semibold">Reference By:</Text> Dr. Mahfuj
                </td>
              </tr>
            </tbody>
          </table>
        </div>
 

      {/* Image Viewer Section */}
      <div ref={viewerRef} className="flex gap-4 flex-wrap mt-5">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="border rounded-md border-gray-300 overflow-hidden"
          >
            <img
              src={XRAY_FLIM}
              alt={`Patient X-Ray ${index + 1}`}
              width={200}
              height={150}
              className="object-cover cursor-pointer"
            />
          </div>
        ))}
      </div>
      </Panel> 
  );
};

export default PatientView;
