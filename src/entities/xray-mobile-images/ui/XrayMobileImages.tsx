import { ReportSubmissionForm } from "@/entities";
import { useAuth } from "@/shared/hooks";
import { Button, Input } from "@/shared/ui";
import { type ChangeEvent, useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
interface XrayMobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string }[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  patient_id: string;
}

const XrayMobileImages = ({
  isOpen,
  onClose,
  images,
  activeIndex,
  setActiveIndex,
  patient_id,
}: XrayMobileModalProps) => {
  const { role } = useAuth()
  const [filters, setFilters] = useState({
    exposure: 100,
    contrast: 100,
    invert: 0,
    sepia: 0,
  });

  if (!isOpen) return null;

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const resetFilters = () => {
    setFilters({ exposure: 100, contrast: 100, invert: 0, sepia: 0 });
  };

  const handleNext = () => {
    if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const imageFilterStyle = {
    filter: `brightness(${filters.exposure}%) contrast(${filters.contrast}%) invert(${filters.invert}%) sepia(${filters.sepia}%)`,
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-white z-[9999] flex flex-col overflow-y-auto p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">
            Adjustments ({activeIndex + 1}/{images.length})
          </h3>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-1 rounded-md text-5xl"
          >
            <IoIosCloseCircle />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Exposure"
            name="exposure"
            type="range"
            min="0"
            max="200"
            value={String(filters.exposure)}
            onChange={handleFilterChange}
          />
          <Input
            label="Contrast"
            name="contrast"
            type="range"
            min="0"
            max="200"
            value={String(filters.contrast)}
            onChange={handleFilterChange}
          />
          <Input
            label="Invert"
            name="invert"
            type="range"
            min="0"
            max="100"
            value={String(filters.invert)}
            onChange={handleFilterChange}
          />
          <Input
            label="Sepia"
            name="sepia"
            type="range"
            min="0"
            max="100"
            value={String(filters.sepia)}
            onChange={handleFilterChange}
          />
        </div>
        <Button
          onClick={resetFilters}
          className="w-full mt-2 !h-10 !bg-gray-500 text-md"
        >
          Reset All
        </Button>
      </div>

      <div className="relative flex items-center justify-center mt-8">
        <button
          onClick={handlePrev}
          className={`absolute left-2 z-20 p-4 text-3xl ${activeIndex === 0 ? "opacity-10" : "opacity-100"
            }`}
          disabled={activeIndex === 0}
        >
          <FaArrowLeft />
        </button>

        <div className="w-[80%] mx-auto overflow-hidden">
          <img
            src={images[activeIndex]?.src}
            alt="Xray"
            className="object-contain transition-all border border-gray-300 rounded-md mx-auto"
            style={imageFilterStyle}
          />
        </div>

        <button
          onClick={handleNext}
          className={`absolute right-2 z-20 p-4  text-3xl ${activeIndex === images.length - 1 ? "opacity-10" : "opacity-100"
            }`}
          disabled={activeIndex === images.length - 1}
        >
          <FaArrowRight />
        </button>
      </div>
      {
        (role === "admin" || role === "user") ? "" : <div className="p-5">
          <ReportSubmissionForm patient_id={patient_id} />
        </div>
      }

    </div>,
    document.body
  );
};
export default XrayMobileImages;
