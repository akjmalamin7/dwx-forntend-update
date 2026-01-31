import React, { useEffect, useRef } from "react";
import type { AnnotationModel } from "./Annotation";

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
  annotationMode: boolean;
  currentIndex: number;
  currentImage: string;
  measurements: Measurement[];
  currentMeasurement: Measurement | null;
  annotations: AnnotationModel[];
  currentAnnotation: AnnotationModel | null;
  isDrawing: boolean;
  isDragging: boolean;
  getImageFilters: () => string;
  getGridClass: () => string;
  getGridRows: () => string;
  getDisplayImages: () => { src: string; index: number }[];
  calculateDistance: (x1: number, y1: number, x2: number, y2: number) => number;
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: () => void;
  handleWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
  setCurrentIndex: (idx: number) => void;
  // নতুন যোগ করা হয়েছে
  handlePrev: () => void;
  handleNext: () => void;
}

const MainImageDisplay = ({
  viewMode,
  zoom,
  rotation,
  panPosition,
  measureMode,
  annotationMode,
  currentIndex,
  currentImage,
  measurements,
  annotations,
  currentAnnotation,
  isDrawing,
  getImageFilters,
  getGridClass,
  getGridRows,
  getDisplayImages,
  calculateDistance,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheel,
  setCurrentIndex,
  // ডিস্ট্রাকচার করা হলো
  handlePrev,
  handleNext,
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
    <div className="flex-1 flex flex-col h-full bg-gray-300 relative">
      <div
        ref={containerRef}
        className={`flex-1 relative overflow-hidden ${viewMode === 1 ? "" : "p-2"}`}
        style={{
          cursor:
            measureMode || annotationMode
              ? "crosshair"
              : zoom > 1
                ? "move"
                : "ns-resize",
        }}
        onMouseDown={viewMode === 1 ? handleMouseDown : undefined}
        onMouseMove={viewMode === 1 ? handleMouseMove : undefined}
        onMouseUp={viewMode === 1 ? handleMouseUp : undefined}
        onWheel={viewMode === 1 ? handleWheel : undefined}
      >
        {viewMode === 1 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={currentImage}
              alt="Patient Scan"
              className="max-w-none select-none transition-transform duration-75"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
                filter: getImageFilters(),
              }}
              draggable={false}
            />

            {/* SVG OVERLAY - Annotations & Measurements */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 10 }}
            >
              {/* 1. Measurements (Green Lines) */}
              {measurements.map((m) => {
                const dist = calculateDistance(m.x1, m.y1, m.x2, m.y2);
                return (
                  <g key={m.id}>
                    <line
                      x1={m.x1}
                      y1={m.y1}
                      x2={m.x2}
                      y2={m.y2}
                      stroke="#00FF00"
                      strokeWidth="2"
                    />
                    <circle cx={m.x1} cy={m.y1} r="4" fill="#00FF00" />
                    <circle cx={m.x2} cy={m.y2} r="4" fill="#00FF00" />
                    <text
                      x={(m.x1 + m.x2) / 2}
                      y={(m.y1 + m.y2) / 2 - 10}
                      fill="#00FF00"
                      fontSize="14"
                      textAnchor="middle"
                      fontWeight="bold"
                      style={{ filter: "drop-shadow(1px 1px 1px black)" }}
                    >
                      {dist.toFixed(1)} px
                    </text>
                  </g>
                );
              })}

              {/* 2. Annotations (Saved) */}
              {annotations.map((ann) => {
                const r = calculateDistance(ann.x1, ann.y1, ann.x2, ann.y2);
                return (
                  <g key={ann.id}>
                    {ann.type === "arrow" && (
                      <>
                        <defs>
                          <marker
                            id={`arrowhead-${ann.id}`}
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#FF6B6B" />
                          </marker>
                        </defs>
                        <line
                          x1={ann.x1}
                          y1={ann.y1}
                          x2={ann.x2}
                          y2={ann.y2}
                          stroke="#FF6B6B"
                          strokeWidth="3"
                          markerEnd={`url(#arrowhead-${ann.id})`}
                        />
                      </>
                    )}
                    {ann.type === "rectangle" && (
                      <>
                        <rect
                          x={Math.min(ann.x1, ann.x2)}
                          y={Math.min(ann.y1, ann.y2)}
                          width={Math.abs(ann.x2 - ann.x1)}
                          height={Math.abs(ann.y2 - ann.y1)}
                          fill="none"
                          stroke="#4ECDC4"
                          strokeWidth="3"
                        />
                        <text
                          x={Math.min(ann.x1, ann.x2)}
                          y={Math.min(ann.y1, ann.y2) - 5}
                          fill="#4ECDC4"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {Math.abs(ann.x2 - ann.x1).toFixed(0)}x
                          {Math.abs(ann.y2 - ann.y1).toFixed(0)} px
                        </text>
                      </>
                    )}
                    {ann.type === "circle" && (
                      <>
                        <circle
                          cx={ann.x1}
                          cy={ann.y1}
                          r={r}
                          fill="none"
                          stroke="#A78BFA"
                          strokeWidth="3"
                        />
                        <text
                          x={ann.x1}
                          y={ann.y1 - r - 8}
                          fill="#A78BFA"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                          style={{ filter: "drop-shadow(1px 1px 1px black)" }}
                        >
                          ⌀ {(r * 2).toFixed(1)} px
                        </text>
                      </>
                    )}
                    {ann.type === "text" && (
                      <text
                        x={ann.x1}
                        y={ann.y1}
                        fill="#FFD93D"
                        fontSize="18"
                        fontWeight="bold"
                        style={{ filter: "drop-shadow(2px 2px 2px black)" }}
                      >
                        {ann.text}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* 3. Live Drawing Preview */}
              {isDrawing && currentAnnotation && (
                <g opacity="0.6">
                  {currentAnnotation.type === "arrow" && (
                    <line
                      x1={currentAnnotation.x1}
                      y1={currentAnnotation.y1}
                      x2={currentAnnotation.x2}
                      y2={currentAnnotation.y2}
                      stroke="#FF6B6B"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  )}
                  {currentAnnotation.type === "rectangle" && (
                    <>
                      <rect
                        x={Math.min(currentAnnotation.x1, currentAnnotation.x2)}
                        y={Math.min(currentAnnotation.y1, currentAnnotation.y2)}
                        width={Math.abs(
                          currentAnnotation.x2 - currentAnnotation.x1,
                        )}
                        height={Math.abs(
                          currentAnnotation.y2 - currentAnnotation.y1,
                        )}
                        fill="none"
                        stroke="#4ECDC4"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </>
                  )}
                  {currentAnnotation.type === "circle" &&
                    (() => {
                      const liveR = calculateDistance(
                        currentAnnotation.x1,
                        currentAnnotation.y1,
                        currentAnnotation.x2,
                        currentAnnotation.y2,
                      );
                      return (
                        <circle
                          cx={currentAnnotation.x1}
                          cy={currentAnnotation.y1}
                          r={liveR}
                          fill="none"
                          stroke="#A78BFA"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                      );
                    })()}
                </g>
              )}
            </svg>

            {/* Navigation Buttons (Single View Mode Only) */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-colors border border-gray-300 shadow-lg pointer-events-auto"
              style={{ zIndex: 30 }}
              title="Previous (←)"
            >
              <svg
                className="w-6 h-6 text-gray-800"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-colors border border-gray-300 shadow-lg pointer-events-auto"
              style={{ zIndex: 30 }}
              title="Next (→)"
            >
              <svg
                className="w-6 h-6 text-gray-800"
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
          </div>
        ) : (
          /* Multi-image grid view */
          <div
            className={`grid ${getGridClass()} ${getGridRows()} gap-2 h-full`}
          >
            {getDisplayImages().map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(img.index)}
                className={`relative bg-black rounded overflow-hidden cursor-pointer ${img.index === currentIndex ? "ring-2 ring-blue-500" : "hover:ring-1 hover:ring-gray-400"}`}
              >
                <img
                  src={img.src}
                  alt="Scan Grid"
                  className="w-full h-full object-contain"
                  style={{ filter: getImageFilters() }}
                />
                <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 rounded">
                  {img.index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainImageDisplay;
