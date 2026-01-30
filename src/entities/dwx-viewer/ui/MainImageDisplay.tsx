import { useEffect, useRef } from "react";

interface Measurement {
  id: string | number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Props {
  viewMode: number;
  zoom: number;
  rotation: number;
  panPosition: { x: number; y: number };
  measureMode: boolean;

  currentIndex: number;
  currentImage: string;

  measurements: Measurement[];
  currentMeasurement: Measurement | null;
  isDrawing: boolean;

  isDragging: boolean;
  isImageChangeDrag: boolean;
  dragDistance: number;

  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: () => void;
  handleWheel: (e: React.WheelEvent<HTMLDivElement>) => void;

  handleNext: () => void;
  handlePrev: () => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;

  calculateDistance: (x1: number, y1: number, x2: number, y2: number) => number;

  getImageFilters: () => string;
  getGridClass: () => string;
  getGridRows: () => string;
  getDisplayImages: () => { src: string; index: number }[];
}

const MainImageDisplay = ({
  viewMode,
  zoom,
  rotation,
  panPosition,
  measureMode,
  currentIndex,
  currentImage,
  measurements,
  currentMeasurement,
  isDrawing,
  isDragging,
  isImageChangeDrag,
  dragDistance,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheel,
  handleNext,
  handlePrev,
  setCurrentIndex,
  calculateDistance,
  getImageFilters,
  getGridClass,
  getGridRows,
  getDisplayImages,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (viewMode !== 1) return;

      if (e.deltaY < 0) {
        handlePrev();
      } else {
        handleNext();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, [handleNext, handlePrev, viewMode]);

  return (
    <div className="col-span-4">
      <div className="flex-1 flex flex-col h-full">
        <div
          ref={containerRef}
          className={`flex-1 relative overflow-hidden bg-gray-300 ${
            viewMode === 1 ? "" : "p-2"
          }`}
          style={{
            cursor: measureMode ? "crosshair" : zoom > 1 ? "move" : "ns-resize",
          }}
          onMouseDown={viewMode === 1 ? handleMouseDown : undefined}
          onMouseMove={viewMode === 1 ? handleMouseMove : undefined}
          onMouseUp={viewMode === 1 ? handleMouseUp : undefined}
          onMouseLeave={viewMode === 1 ? handleMouseUp : undefined}
          onWheel={viewMode === 1 ? handleWheel : undefined}
        >
          {viewMode === 1 ? (
            // Single image view (with zoom/pan)
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={currentImage}
                  alt={`Scan ${currentIndex + 1}`}
                  className="max-w-none select-none"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
                    transition: isDragging ? "none" : "transform 0.1s ease-out",
                    filter: getImageFilters(),
                  }}
                  draggable={false}
                />

                {/* Measurement SVG Overlay */}
                {viewMode === 1 && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 10 }}
                  >
                    {/* Existing measurements */}
                    {measurements.map((m) => {
                      const distance = calculateDistance(
                        m.x1,
                        m.y1,
                        m.x2,
                        m.y2,
                      );
                      const midX = (m.x1 + m.x2) / 2;
                      const midY = (m.y1 + m.y2) / 2;

                      return (
                        <g key={m.id}>
                          {/* Line */}
                          <line
                            x1={m.x1}
                            y1={m.y1}
                            x2={m.x2}
                            y2={m.y2}
                            stroke="#00FF00"
                            strokeWidth="2"
                          />
                          {/* Start point */}
                          <circle cx={m.x1} cy={m.y1} r="4" fill="#00FF00" />
                          {/* End point */}
                          <circle cx={m.x2} cy={m.y2} r="4" fill="#00FF00" />
                          {/* Distance label */}
                          <text
                            x={midX}
                            y={midY - 10}
                            fill="white"
                            fontSize="14"
                            fontWeight="bold"
                            textAnchor="middle"
                            style={{
                              textShadow:
                                "1px 1px 2px black, -1px -1px 2px black",
                            }}
                          >
                            {distance.toFixed(2)} pixels
                          </text>
                        </g>
                      );
                    })}

                    {/* Current measurement being drawn */}
                    {isDrawing && currentMeasurement && (
                      <g>
                        <line
                          x1={currentMeasurement.x1}
                          y1={currentMeasurement.y1}
                          x2={currentMeasurement.x2}
                          y2={currentMeasurement.y2}
                          stroke="#FFFF00"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                        <circle
                          cx={currentMeasurement.x1}
                          cy={currentMeasurement.y1}
                          r="4"
                          fill="#FFFF00"
                        />
                        <circle
                          cx={currentMeasurement.x2}
                          cy={currentMeasurement.y2}
                          r="4"
                          fill="#FFFF00"
                        />
                        <text
                          x={
                            (currentMeasurement.x1 + currentMeasurement.x2) / 2
                          }
                          y={
                            (currentMeasurement.y1 + currentMeasurement.y2) /
                              2 -
                            10
                          }
                          fill="yellow"
                          fontSize="14"
                          fontWeight="bold"
                          textAnchor="middle"
                          style={{
                            textShadow:
                              "1px 1px 2px black, -1px -1px 2px black",
                          }}
                        >
                          {calculateDistance(
                            currentMeasurement.x1,
                            currentMeasurement.y1,
                            currentMeasurement.x2,
                            currentMeasurement.y2,
                          ).toFixed(2)}{" "}
                          pixels
                        </text>
                      </g>
                    )}
                  </svg>
                )}

                {/* Scroll indicator */}
                {isImageChangeDrag && Math.abs(dragDistance) > 10 && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 shadow-lg">
                    <div className="text-center">
                      {dragDistance < 0 ? (
                        <div>
                          <svg
                            className="w-6 h-6 mx-auto animate-bounce"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-xs mt-1">Next Image</p>
                        </div>
                      ) : (
                        <div>
                          <svg
                            className="w-6 h-6 mx-auto animate-bounce"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-xs mt-1">Previous Image</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation arrows (only in single view) */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-colors border border-gray-300 shadow-lg"
                title="Previous (←)"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-colors border border-gray-300 shadow-lg"
                title="Next (→)"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          ) : (
            // Multi-image grid view
            <div
              className={`grid ${getGridClass()} ${getGridRows()} gap-2 h-full`}
            >
              {getDisplayImages().map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(img.index)}
                  className={`relative bg-white rounded overflow-hidden cursor-pointer transition-all ${
                    img.index === currentIndex
                      ? "ring-2 ring-blue-500 shadow-lg"
                      : "hover:ring-2 hover:ring-gray-400"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={`Image ${img.index + 1}`}
                    className="w-full h-full object-contain"
                    style={{ filter: getImageFilters() }}
                  />
                  <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-gray-700">
                    {img.index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: Play/Pause controls */}
        {/* <div className="bg-[#f7f7f7]! border-t border-gray-300 p-2 flex items-center justify-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded transition-colors border border-gray-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors border border-gray-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MainImageDisplay;
