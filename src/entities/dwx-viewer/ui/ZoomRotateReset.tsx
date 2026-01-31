interface Props {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  resetView: () => void;

  currentIndex?: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ZoomRotateReset = ({ setZoom, setRotation, resetView }: Props) => {
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.25));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div>
      <div className="flex gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white hover:bg-gray-100 rounded transition-colors border border-gray-300"
          title="Zoom In (+)"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white hover:bg-gray-100 rounded transition-colors border border-gray-300"
          title="Zoom Out (-)"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
            />
          </svg>
        </button>
        <button
          onClick={handleRotate}
          className="p-2 bg-white hover:bg-gray-100 rounded transition-colors border border-gray-300"
          title="Rotate (R)"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
        <button
          onClick={resetView}
          className="px-3 py-2 bg-white hover:bg-gray-100 rounded transition-colors text-sm border border-gray-300"
          title="Reset View (0)"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ZoomRotateReset;
