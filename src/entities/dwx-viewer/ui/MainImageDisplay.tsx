import React, { useEffect, useRef } from "react";
import type { AnnotationModel } from "./Annotation";

/* =========================
   CONFIG (replace later with DICOM PixelSpacing)
   ========================= */
const MM_PER_PIXEL = 0.5;

/* =========================
   HELPERS
   ========================= */
const calculateDistanceMM = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const px = Math.sqrt(dx * dx + dy * dy);
  return px * MM_PER_PIXEL;
};

/* =========================
   TYPES
   ========================= */
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
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: () => void;
  handleWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
  setCurrentIndex: (idx: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

/* =========================
   COMPONENT
   ========================= */
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
  getImageFilters,
  getGridClass,
  getGridRows,
  getDisplayImages,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleWheel,
  setCurrentIndex,
  handlePrev,
  handleNext,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  /* =========================
     CUSTOM WHEEL NAVIGATION
     ========================= */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheelManual = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 100) return;

      e.deltaY > 0 ? handleNext() : handlePrev();
      lastScrollTime.current = now;
    };

    el.addEventListener("wheel", onWheelManual, { passive: false });
    return () => el.removeEventListener("wheel", onWheelManual);
  }, [handleNext, handlePrev]);

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-300 relative">
      <div
        ref={containerRef}
        className={`flex-1 relative overflow-hidden ${
          viewMode === 1 ? "" : "p-2"
        }`}
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
            {/* IMAGE */}
            <img
              src={currentImage}
              alt="Patient Scan"
              className="max-w-none select-none"
              draggable={false}
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
                filter: getImageFilters(),
              }}
            />

            {/* SVG OVERLAY */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* MEASUREMENTS */}
              {measurements.map((m) => {
                const mm = calculateDistanceMM(
                  m.x1,
                  m.y1,
                  m.x2,
                  m.y2,
                );

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
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ filter: "drop-shadow(1px 1px 1px black)" }}
                    >
                      {mm.toFixed(2)} mm
                    </text>
                  </g>
                );
              })}

              {/* ANNOTATIONS */}
              {annotations.map((ann) => {
                const rMM = calculateDistanceMM(
                  ann.x1,
                  ann.y1,
                  ann.x2,
                  ann.y2,
                );

                return (
                  <g key={ann.id}>
                    {ann.type === "arrow" && (
                      <line
                        x1={ann.x1}
                        y1={ann.y1}
                        x2={ann.x2}
                        y2={ann.y2}
                        stroke="#FF6B6B"
                        strokeWidth="3"
                      />
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
                          {(Math.abs(ann.x2 - ann.x1) * MM_PER_PIXEL).toFixed(
                            2,
                          )}
                          mm ×
                          {(Math.abs(ann.y2 - ann.y1) * MM_PER_PIXEL).toFixed(
                            2,
                          )}
                          mm
                        </text>
                      </>
                    )}

                    {ann.type === "circle" && (
                      <>
                        <circle
                          cx={ann.x1}
                          cy={ann.y1}
                          r={rMM}
                          fill="none"
                          stroke="#A78BFA"
                          strokeWidth="3"
                        />
                        <text
                          x={ann.x1}
                          y={ann.y1 - rMM - 8}
                          fill="#A78BFA"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          ⌀ {(rMM * 2).toFixed(2)} mm
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
                      >
                        {ann.text}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* NAV BUTTONS */}
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
          <div className={`grid ${getGridClass()} ${getGridRows()} gap-2 h-full`}>
            {getDisplayImages().map((img) => (
              <div
                key={img.index}
                onClick={() => setCurrentIndex(img.index)}
                className={`relative bg-black rounded overflow-hidden cursor-pointer ${
                  img.index === currentIndex
                    ? "ring-2 ring-blue-500"
                    : "hover:ring-1 hover:ring-gray-400"
                }`}
              >
                <img
                  src={img.src}
                  className="w-full h-full object-contain"
                  style={{ filter: getImageFilters() }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainImageDisplay;
