interface SpacingUnitSelectorProps {
  measurementUnit: "mm" | "pixels";
  setMeasurementUnit: (unit: "mm" | "pixels") => void;
  pixelSpacing: number;
  setPixelSpacing: (value: number) => void;
  showPixelSpacingDialog: boolean;
  setShowPixelSpacingDialog: (value: boolean) => void;
}

const SpacingUnitSelector = ({
  measurementUnit,
  setMeasurementUnit,
  pixelSpacing,
  setPixelSpacing,
  showPixelSpacingDialog,
  setShowPixelSpacingDialog,
}: SpacingUnitSelectorProps) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            setMeasurementUnit(measurementUnit === "mm" ? "pixels" : "mm")
          }
          className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          title="Toggle Unit"
        >
          {measurementUnit === "mm" ? "mm" : "px"}
        </button>

        <button
          onClick={() => setShowPixelSpacingDialog(!showPixelSpacingDialog)}
          className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
          title="Set Pixel Spacing"
        >
          ⚙️ {pixelSpacing} mm/px
        </button>
      </div>

      {showPixelSpacingDialog && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-xl p-4 z-50 w-64">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Pixel Spacing
          </label>

          <input
            type="number"
            step="0.01"
            min="0.01"
            max="10"
            value={pixelSpacing}
            onChange={(e) => setPixelSpacing(parseFloat(e.target.value) || 0.5)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />

          <div className="mt-3 space-y-1 text-xs text-gray-600">
            <p className="font-semibold">Common values</p>
            <button
              onClick={() => setPixelSpacing(0.5)}
              className="block hover:text-blue-600"
            >
              • 0.5 mm/px (CT head)
            </button>
            <button
              onClick={() => setPixelSpacing(0.7)}
              className="block hover:text-blue-600"
            >
              • 0.7 mm/px (CT chest)
            </button>
            <button
              onClick={() => setPixelSpacing(1.0)}
              className="block hover:text-blue-600"
            >
              • 1.0 mm/px (CT abdomen)
            </button>
          </div>

          <button
            onClick={() => setShowPixelSpacingDialog(false)}
            className="w-full mt-3 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};
export default SpacingUnitSelector;
