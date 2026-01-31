import type { PATIENT_IMAGE_ITEM_MODEL } from "@/shared/redux/features/agent/patient-view/patientView.types";
import { useEffect, useState } from "react";
import AdjustmentPanel from "./AdjustmentPanel";
import GridViewButton from "./GridViewButton";
import MainImageDisplay from "./MainImageDisplay";
import MeasurementTool from "./MeasurementTool";
import ThumnailSidebar from "./ThumnailSidebar";
import ZoomRotateReset from "./ZoomRotateReset";
interface Measurement {
  id: string; // or number
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Props {
  images?: string[];
  attachments?: PATIENT_IMAGE_ITEM_MODEL[];
}
const DwxViewer = ({ attachments = [] }: Props) => {
  const effectiveImages =
    attachments.length > 0 ? attachments.map((att) => att.original_url) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragDistance, setDragDistance] = useState(0);
  const [isImageChangeDrag, setIsImageChangeDrag] = useState(false);

  // View mode: 1, 2, 4, or 6 images
  const [viewMode, setViewMode] = useState(1); // 1 = single, 2 = dual, 4 = quad, 6 = six

  // Measurement tool
  const [measureMode, setMeasureMode] = useState(false);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [currentMeasurement, setCurrentMeasurement] =
    useState<Measurement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Image adjustment controls
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

  // const currentImage = images[currentIndex];
  const currentImage = effectiveImages[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % effectiveImages.length);
    resetView();
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + effectiveImages.length) % effectiveImages.length,
    );
    resetView();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "r" || e.key === "R") handleRotate();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") resetView();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, effectiveImages.length]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.25));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const resetView = () => {
    setZoom(1);
    setRotation(0);
    setPanPosition({ x: 0, y: 0 });
  };

  const resetAdjustments = () => {
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
    });
  };

  const getImageFilters = () => {
    return `
      grayscale(${adjustments.grayscale}%)
      blur(${adjustments.blur}px)
      brightness(${adjustments.exposure}%)
      contrast(${adjustments.contrast}%)
      hue-rotate(${adjustments.hueRotate}deg)
      opacity(${adjustments.opacity}%)
      invert(${adjustments.invert}%)
      saturate(${adjustments.saturate}%)
      sepia(${adjustments.sepia}%)
    `.trim();
  };

  // const getDisplayImages = () => {
  //   const displayImages = [];
  //   for (let i = 0; i < viewMode; i++) {
  //     const index = (currentIndex + i) % images.length;
  //     displayImages.push({ index, src: images[index] });
  //   }
  //   return displayImages;
  // };

  const getGridClass = () => {
    switch (viewMode) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 4:
        return "grid-cols-2";
      case 6:
        return "grid-cols-3";
      default:
        return "grid-cols-1";
    }
  };

  const getGridRows = () => {
    switch (viewMode) {
      case 1:
        return "grid-rows-1";
      case 2:
        return "grid-rows-1";
      case 4:
        return "grid-rows-2";
      case 6:
        return "grid-rows-2";
      default:
        return "grid-rows-1";
    }
  };

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): number => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleMeasureMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!measureMode || viewMode !== 1) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentMeasurement({
      x1: x,
      y1: y,
      x2: x,
      y2: y,
      id: Date.now().toString(),
    });
  };

  const handleMeasureMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !currentMeasurement) return;

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentMeasurement({
      ...currentMeasurement,
      x2: x,
      y2: y,
    });
  };

  const handleMeasureMouseUp = () => {
    if (isDrawing && currentMeasurement) {
      const distance = calculateDistance(
        currentMeasurement.x1,
        currentMeasurement.y1,
        currentMeasurement.x2,
        currentMeasurement.y2,
      );

      if (distance > 5) {
        // Only save if line is meaningful
        setMeasurements([...measurements, currentMeasurement]);
      }

      setIsDrawing(false);
      setCurrentMeasurement(null);
    }
  };

  const clearMeasurements = () => {
    setMeasurements([]);
    setCurrentMeasurement(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (measureMode) {
      handleMeasureMouseDown(e);
      return;
    }

    setIsDragging(true);
    setDragDistance(0);

    if (zoom > 1) {
      // Pan mode when zoomed
      setIsImageChangeDrag(false);
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y,
      });
    } else {
      // Image change mode when not zoomed (CT scan style)
      setIsImageChangeDrag(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (measureMode && isDrawing) {
      handleMeasureMouseMove(e);
      return;
    }

    if (!isDragging) return;

    if (zoom > 1 && !isImageChangeDrag) {
      // Pan the zoomed image
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else if (isImageChangeDrag) {
      // Calculate vertical drag distance for image change
      const deltaY = e.clientY - dragStart.y;
      setDragDistance(deltaY);

      // Change image based on vertical drag (like CT scan scroll)
      const threshold = 30; // pixels to drag before changing image

      if (Math.abs(deltaY) > threshold) {
        if (deltaY < 0) {
          // Dragged up - next image
          handleNext();
        } else {
          // Dragged down - previous image
          handlePrev();
        }
        // Reset drag start position
        setDragStart({ x: e.clientX, y: e.clientY });
        setDragDistance(0);
      }
    }
  };

  const handleMouseUp = () => {
    if (measureMode && isDrawing) {
      handleMeasureMouseUp();
      return;
    }

    setIsDragging(false);
    setIsImageChangeDrag(false);
    setDragDistance(0);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Check if adjustment panel is open and mouse is over it
    const adjustmentPanel = e.currentTarget.querySelector(".w-80");
    if (
      adjustmentPanel &&
      e.target instanceof Element &&
      e.target.closest(".w-80")
    ) {
      // Allow normal scrolling in adjustment panel
      return;
    }

    // If zoomed in, use wheel for zoom
    if (zoom > 1) {
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    } else {
      // If not zoomed, use wheel to change images (CT scan style)
      if (e.deltaY < 0) {
        // Scroll up - previous image
        handlePrev();
      } else {
        // Scroll down - next image
        handleNext();
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-8 gap-4  ">
        <div className="col-span-6 bg-[#f1f1f1] border border-[#ebebeb] rounded-lg p-3">
          <AdjustmentPanel
            adjustments={adjustments}
            setAdjustments={setAdjustments}
            resetAdjustments={resetAdjustments}
          />
        </div>

        <div className="col-span-2 bg-[#f1f1f1] rounded-lg p-3">
          <div className="flex gap-2 flex-wrap">
            <ZoomRotateReset
              setZoom={setZoom}
              setRotation={setRotation}
              resetView={resetView}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <GridViewButton viewMode={viewMode} setViewMode={setViewMode} />
            <MeasurementTool
              measureMode={measureMode}
              setMeasureMode={setMeasureMode}
              clearMeasurements={clearMeasurements}
              viewMode={viewMode}
              zoom={zoom}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 h-screen w-full">
        <MainImageDisplay
          viewMode={viewMode}
          zoom={zoom}
          rotation={rotation}
          panPosition={panPosition}
          measureMode={measureMode}
          currentIndex={currentIndex}
          currentImage={currentImage}
          measurements={measurements}
          currentMeasurement={currentMeasurement}
          isDrawing={isDrawing}
          isDragging={isDragging}
          isImageChangeDrag={isImageChangeDrag}
          dragDistance={dragDistance}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleWheel={handleWheel}
          handleNext={handleNext}
          handlePrev={handlePrev}
          setCurrentIndex={setCurrentIndex}
          calculateDistance={calculateDistance}
          getImageFilters={getImageFilters}
          getGridClass={getGridClass}
          getGridRows={getGridRows}
          // getDisplayImages={getDisplayImages}
          getDisplayImages={() => {
            const displayItems = [];
            for (let i = 0; i < viewMode; i++) {
              const index = (currentIndex + i) % effectiveImages.length;
              displayItems.push({ index, src: effectiveImages[index] });
            }
            return displayItems;
          }}
        />
        <ThumnailSidebar
          currentIndex={currentIndex}
          images={effectiveImages}
          setCurrentIndex={setCurrentIndex}
          resetView={resetView}
        />
      </div>
    </div>
  );
};

export default DwxViewer;
