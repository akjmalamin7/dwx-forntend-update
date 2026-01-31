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
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12h3m3 0h3m3 0h3m3 0h3"
          />
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
