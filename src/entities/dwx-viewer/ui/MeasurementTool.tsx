interface Props {
  measureMode: boolean;
  setMeasureMode: React.Dispatch<React.SetStateAction<boolean>>;
  clearMeasurements: () => void;
  viewMode: number;
  zoom: number;
}

const MeasurementTool = ({
  measureMode,
  setMeasureMode,
  clearMeasurements,
  viewMode,
  zoom,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setMeasureMode(!measureMode);
          if (measureMode) {
            clearMeasurements();
          }
        }}
        className={`p-2 rounded transition-colors border ${
          measureMode
            ? "bg-blue-500 text-white border-blue-600"
            : "bg-white hover:bg-gray-100 border-gray-300"
        }`}
        title="Measurement Tool"
        disabled={viewMode !== 1}
      >
        {/* RULER / SCALE ICON */}
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="6" width="18" height="12" rx="2" ry="2" />
          <line x1="7" y1="6" x2="7" y2="12" />
          <line x1="11" y1="6" x2="11" y2="10" />
          <line x1="15" y1="6" x2="15" y2="12" />
          <line x1="19" y1="6" x2="19" y2="10" />
        </svg>
      </button>

      {measureMode && (
        <button
          onClick={clearMeasurements}
          className="px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          title="Clear All Measurements"
        >
          Clear All
        </button>
      )}

      <span className="text-sm text-gray-600 ml-2">
        Zoom: {(zoom * 100).toFixed(0)}%
      </span>
    </div>
  );
};

export default MeasurementTool;
