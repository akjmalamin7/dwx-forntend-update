import type { PATIENT_IMAGE_ITEM_MODEL } from "@/shared/redux/features/agent/patient-view/patientView.types";
import { useState } from "react";
import AdjustmentPanel from "./AdjustmentPanel";
import Annotation, {
  type AnnotationModel,
  type AnnotationType,
} from "./Annotation";
import GridViewButton from "./GridViewButton";
import MainImageDisplay from "./MainImageDisplay";
import MeasurementTool from "./MeasurementTool";
import ThumnailSidebar from "./ThumnailSidebar";
import ZoomRotateReset from "./ZoomRotateReset";

/* =========================
   CONFIG: MM PER PIXEL
   ========================= */
// 🔴 Replace this with real DICOM PixelSpacing when available
const MM_PER_PIXEL = 0.5;

/* =========================
   TYPES
   ========================= */
interface MeasurementModel {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lengthPx: number;
  lengthMm: number;
}
interface Props {
  attachments?: PATIENT_IMAGE_ITEM_MODEL[];
}

const DwxViewer = ({ attachments = [] }: Props) => {
  const effectiveImages = attachments.map((att) => att.original_url);

  /* =========================
     BASIC STATE
     ========================= */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState(1);

  /* =========================
     TOOL STATE
     ========================= */
  const [measureMode, setMeasureMode] = useState(false);
  const [annotationMode, setAnnotationMode] = useState(false);
  const [annotationType, setAnnotationType] =
    useState<AnnotationType>("arrow");

  const [measurements, setMeasurements] = useState<MeasurementModel[]>([]);
  const [annotations, setAnnotations] = useState<AnnotationModel[]>([]);

  /* =========================
     MOUSE STATE
     ========================= */
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDrawing, setCurrentDrawing] =
    useState<MeasurementModel | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  /* =========================
     IMAGE ADJUSTMENTS
     ========================= */
  const [adjustments, setAdjustments] = useState({
    grayscale: 0,
    blur: 0,
    exposure: 100,
    contrast: 100,
    hueRotate: 0,
    opacity: 100,
    invert: 0,
    saturate: 100,
    sepia: 0,
  });

  /* =========================
     HELPERS
     ========================= */
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % effectiveImages.length);

  const handlePrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + effectiveImages.length) % effectiveImages.length,
    );
  const resetView = () => {
    setZoom(1);
    setRotation(0);
    setPanPosition({ x: 0, y: 0 });
  };

  const calculateDistancePx = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const convertPxToMm = (px: number) => px * MM_PER_PIXEL;

  /* =========================
     MOUSE HANDLERS
     ========================= */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (measureMode || annotationMode) {
      setIsDrawing(true);
      setCurrentDrawing({
        id: Date.now(),
        x1: x,
        y1: y,
        x2: x,
        y2: y,
        lengthPx: 0,
        lengthMm: 0,
      });
    } else {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing && currentDrawing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x2 = e.clientX - rect.left;
      const y2 = e.clientY - rect.top;

      const lengthPx = calculateDistancePx(
        currentDrawing.x1,
        currentDrawing.y1,
        x2,
        y2,
      );

      setCurrentDrawing({
        ...currentDrawing,
        x2,
        y2,
        lengthPx,
        lengthMm: convertPxToMm(lengthPx),
      });
    } else if (isDragging && zoom > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentDrawing) {
      if (currentDrawing.lengthPx > 5) {
        if (measureMode) {
          setMeasurements((prev) => [...prev, currentDrawing]);
        } else if (annotationMode) {
          const base = {
            id: currentDrawing.id,
            x1: currentDrawing.x1,
            y1: currentDrawing.y1,
            x2: currentDrawing.x2,
            y2: currentDrawing.y2,
            type: annotationType,
          };

          if (annotationType === "text") {
            const text = prompt("Enter text annotation:");
            if (text) {
              setAnnotations((prev) => [
                ...prev,
                { ...base, text } as AnnotationModel,
              ]);
            }
          } else {
            setAnnotations((prev) => [
              ...prev,
              base as AnnotationModel,
            ]);
          }
        }
      }
    }

    setIsDrawing(false);
    setIsDragging(false);
    setCurrentDrawing(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (zoom > 1) {
      setZoom((z) =>
        e.deltaY < 0 ? Math.min(z + 0.1, 5) : Math.max(z - 0.1, 0.5),
      );
    } else {
      // FIX: Use a standard if-else here
      if (e.deltaY < 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  /* =========================
     RENDER
     ========================= */
  return (
    <div className="flex h-[92vh] w-full mt-5 bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* LEFT TOOLBAR */}
      <div className="w-[280px] bg-gray-50 border-r p-4 overflow-y-auto">
        <ZoomRotateReset
          setZoom={setZoom}
          setRotation={setRotation}
          resetView={resetView}
          setCurrentIndex={setCurrentIndex}
        />

        <GridViewButton viewMode={viewMode} setViewMode={setViewMode} />

        <MeasurementTool
          measureMode={measureMode}
          setMeasureMode={(v) => {
            setMeasureMode(v);
            if (v) setAnnotationMode(false);
          }}
          clearMeasurements={() => setMeasurements([])}
          viewMode={viewMode}
          zoom={zoom}
        />

        <Annotation
          annotationMode={annotationMode}
          setAnnotationMode={setAnnotationMode}
          setMeasureMode={setMeasureMode}
          annotations={annotations}
          setAnnotations={setAnnotations}
          annotationType={annotationType}
          setAnnotationType={setAnnotationType}
          viewMode={viewMode}
        />

        <AdjustmentPanel
          adjustments={adjustments}
          setAdjustments={setAdjustments}
          resetAdjustments={() =>
            setAdjustments({
              grayscale: 0,
              blur: 0,
              exposure: 100,
              contrast: 100,
              hueRotate: 0,
              opacity: 100,
              invert: 0,
              saturate: 100,
              sepia: 0,
            })
          }
        />
      </div>

      {/* MAIN VIEW */}
      <MainImageDisplay
        viewMode={viewMode}
        zoom={zoom}
        rotation={rotation}
        panPosition={panPosition}
        measureMode={measureMode}
        annotationMode={annotationMode}
        currentIndex={currentIndex}
        measurements={measurements}
        annotations={annotations}
        isDrawing={isDrawing}
        isDragging={isDragging}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleWheel={handleWheel}
        setCurrentIndex={setCurrentIndex}
        handlePrev={handlePrev}
        handleNext={handleNext}
        currentImage={effectiveImages[currentIndex]}
        currentMeasurement={measureMode ? currentDrawing : null}
        currentAnnotation={
          annotationMode && currentDrawing
            ? ({ ...currentDrawing, type: annotationType } as AnnotationModel)
            : null
        }
        getImageFilters={() =>
          `brightness(${adjustments.exposure}%) contrast(${adjustments.contrast}%) grayscale(${adjustments.grayscale}%) blur(${adjustments.blur}px)`
        }
        getGridClass={() => (viewMode === 6 ? "grid-cols-3" : "grid-cols-2")}
        getGridRows={() => (viewMode <= 2 ? "grid-rows-1" : "grid-rows-2")}
        getDisplayImages={() =>
          Array.from({ length: viewMode }).map((_, i) => {
            const idx = (currentIndex + i) % effectiveImages.length;
            return { index: idx, src: effectiveImages[idx] };
          })
        }
      />

      {/* THUMBNAILS */}
      <div className="w-[250px] border-l bg-gray-50 overflow-y-auto">
        <ThumnailSidebar
          images={effectiveImages}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          resetView={resetView}
        />
      </div>
    </div>
  );
};

export default DwxViewer;