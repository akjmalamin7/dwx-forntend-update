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
interface MeasurementModel {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type?: string;
}
interface Props {
  attachments?: PATIENT_IMAGE_ITEM_MODEL[];
}

const DwxViewer = ({ attachments = [] }: Props) => {
  const effectiveImages = attachments.map((att) => att.original_url);

  // Basic State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState(1);

  // Tools State
  const [measureMode, setMeasureMode] = useState(false);
  const [annotationMode, setAnnotationMode] = useState(false);
  const [annotationType, setAnnotationType] = useState<AnnotationType>("arrow");
  const [measurements, setMeasurements] = useState<MeasurementModel[]>([]);
  const [annotations, setAnnotations] = useState<AnnotationModel[]>([]);

  // Mouse Logic State
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDrawing, setCurrentDrawing] = useState<MeasurementModel | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  // --- Unified Mouse Handlers ---
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
        type: annotationType,
      });
    } else {
      setIsDragging(true);
      if (zoom > 1) {
        setDragStart({
          x: e.clientX - panPosition.x,
          y: e.clientY - panPosition.y,
        });
      } else {
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing && currentDrawing) {
      const rect = e.currentTarget.getBoundingClientRect();
      setCurrentDrawing({
        ...currentDrawing,
        x2: e.clientX - rect.left,
        y2: e.clientY - rect.top,
      });
    } else if (isDragging) {
      if (zoom > 1) {
        setPanPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      } else {
        const deltaY = e.clientY - dragStart.y;
        if (Math.abs(deltaY) > 40) {
          // Threshold for image change
          // Ternary Operator এর বদলে if-else ব্যবহার করা হয়েছে
          if (deltaY < 0) {
            handleNext();
          } else {
            handlePrev();
          }
          setDragStart({ x: e.clientX, y: e.clientY });
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentDrawing) {
      const dist = calculateDistance(
        currentDrawing.x1,
        currentDrawing.y1,
        currentDrawing.x2,
        currentDrawing.y2,
      );

      if (dist > 5) {
        if (measureMode) {
          // Measurement হিসেবে সেভ করা
          setMeasurements([...measurements, currentDrawing]);
        } else if (annotationMode) {
          // Annotation হিসেবে সেভ করার সময় টাইপ কাস্টিং করা হলো
          const newAnnotationBase = {
            id: currentDrawing.id,
            x1: currentDrawing.x1,
            y1: currentDrawing.y1,
            x2: currentDrawing.x2,
            y2: currentDrawing.y2,
            type: annotationType, // সরাসরি স্টেট থেকে টাইপ নেওয়া হলো যা ভ্যালিড AnnotationType
          };

          if (annotationType === "text") {
            const text = prompt("Enter text annotation:");
            if (text) {
              setAnnotations([
                ...annotations,
                { ...newAnnotationBase, text } as AnnotationModel,
              ]);
            }
          } else {
            setAnnotations([
              ...annotations,
              newAnnotationBase as AnnotationModel,
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
      if (e.deltaY < 0) {
        setZoom((z) => Math.min(z + 0.1, 5));
      } else {
        setZoom((z) => Math.max(z - 0.1, 0.5));
      }
    } else {
      if (e.deltaY < 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  return (
    <div className="flex h-[92vh] w-full mt-5 bg-white rounded-lg  border border-gray-200 overflow-hidden">
      {/* 1. Side Toolbar */}
      <div className="w-[280px] bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto flex flex-col gap-2">
        <ZoomRotateReset
          setZoom={setZoom}
          setRotation={setRotation}
          resetView={resetView}
          setCurrentIndex={setCurrentIndex}
        />

        <div className="flex flex-col gap-3">
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
        </div>

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

      {/* 2. Main Display Area */}
      <MainImageDisplay
        {...{
          viewMode,
          zoom,
          rotation,
          panPosition,
          measureMode,
          annotationMode,
          currentIndex,
          measurements,
          annotations,
          isDrawing,
          isDragging,
          calculateDistance,
          handleMouseDown,
          handleMouseMove,
          handleMouseUp,
          handleWheel,
          setCurrentIndex,
          handlePrev,
          handleNext,
        }}
        currentImage={effectiveImages[currentIndex]}
        currentMeasurement={measureMode ? currentDrawing : null}
        currentAnnotation={
          annotationMode && currentDrawing
            ? ({ ...currentDrawing, type: annotationType } as AnnotationModel)
            : null
        }
        getImageFilters={() =>
          `brightness(${adjustments.exposure}%) contrast(${adjustments.contrast}%) grayscale(${adjustments.grayscale}%) blur(${adjustments.blur}px) invert(${adjustments.invert}%)`
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

      {/* 3. Thumbnail Sidebar */}
      <div className="w-[300px] border-l border-gray-200 bg-gray-50 overflow-y-auto">
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
