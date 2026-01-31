import { Input } from "@/shared/ui";
interface AdjustmentValues {
  grayscale: number;
  blur: number;
  exposure: number;
  contrast: number;
  hueRotate: number;
  opacity: number;
  invert: number;
  saturate: number;
  sepia: number;
}
interface Props {
  adjustments: AdjustmentValues;
  setAdjustments: React.Dispatch<React.SetStateAction<AdjustmentValues>>;
  resetAdjustments: () => void;
}
const AdjustmentPanel = ({
  adjustments,
  setAdjustments,
  resetAdjustments,
}: Props) => {
  const handleAdjustmentChange = (key: string, value: number) => {
    setAdjustments((prev) => ({ ...prev, [key]: value }));
  };
  return (
   
    <div className=" overflow-y-auto ">
      <div className="  grid-cols-4 gap-4 items-center">
       

        {/* Blur */}
        <Input
          label="Blur"
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={String(adjustments.blur)}
          onChange={(e) =>
            handleAdjustmentChange("blur", Number(e.target.value))
          }
          className="h-auto!"
        />

        {/* Exposure (Brightness) */}

        <Input
          label="Exposure"
          type="range"
          min="0"
          max="200"
          value={String(adjustments.exposure)}
          onChange={(e) =>
            handleAdjustmentChange("exposure", Number(e.target.value))
          }
          className="h-auto!"
        />

        {/* Contrast */}

        <Input
          label="Contrast"
          type="range"
          min="0"
          max="200"
          value={String(adjustments.contrast)}
          onChange={(e) =>
            handleAdjustmentChange("contrast", Number(e.target.value))
          }
          className="h-auto!"
        />

       

        {/* Opacity */}

        <Input
          label="Opacity"
          type="range"
          min="0"
          max="100"
          value={String(adjustments.opacity)}
          onChange={(e) =>
            handleAdjustmentChange("opacity", Number(e.target.value))
          }
          className="h-auto!"
        />

        {/* Invert */}

        <Input
          label="Invert"
          type="range"
          min="0"
          max="100"
          value={String(adjustments.invert)}
          onChange={(e) =>
            handleAdjustmentChange("invert", Number(e.target.value))
          }
          className="h-auto!"
        />

       

        {/* Sepia */}

        <Input
          label="Sepia"
          type="range"
          min="0"
          max="100"
          value={String(adjustments.sepia)}
          onChange={(e) =>
            handleAdjustmentChange("sepia", Number(e.target.value))
          }
          className="h-auto!"
        />
        <div className="col-span-3">
          <button
            onClick={resetAdjustments}
            className="w-full px-3 py-2 bg-white hover:bg-gray-50 rounded text-sm transition-colors border border-gray-300"
          >
            Reset All
          </button>
        </div>
      </div>
    </div> 
  );
};

export default AdjustmentPanel;
