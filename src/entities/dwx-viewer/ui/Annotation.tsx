import React from "react";

// Types এবং Interface এক্সপোর্ট করা হয়েছে যাতে অন্য ফাইল ব্যবহার করতে পারে
export type AnnotationType = "arrow" | "text" | "rectangle" | "circle";

export interface AnnotationModel {
  id: number;
  type: AnnotationType;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  text?: string;
}

interface Props {
  viewMode?: number;
  annotationMode: boolean;
  setAnnotationMode: (value: boolean) => void;
  setMeasureMode: (value: boolean) => void;
  annotations: AnnotationModel[];
  setAnnotations: React.Dispatch<React.SetStateAction<AnnotationModel[]>>;
  annotationType: AnnotationType;
  setAnnotationType: (value: AnnotationType) => void;
}

const Annotation = ({
  viewMode = 1,
  annotationMode,
  setAnnotationMode,
  setMeasureMode,
  annotations,
  setAnnotations,
  annotationType,
  setAnnotationType,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 border-t border-gray-300 pt-3 mt-3 w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          Annotations
        </span>
        <button
          onClick={() => {
            setAnnotationMode(!annotationMode);
            if (!annotationMode) setMeasureMode(false); // Annotation অন করলে Measure অফ হবে
          }}
          className={`p-2 rounded transition-colors border ${
            annotationMode
              ? "bg-purple-600 text-white border-purple-700 shadow-inner"
              : "bg-white hover:bg-gray-100 border-gray-300"
          }`}
          title="Annotation Tool"
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </div>

      {annotationMode && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-1 bg-gray-200 rounded p-1">
            {(["arrow",  "rectangle", "circle"] as AnnotationType[]).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => setAnnotationType(type)}
                  className={`flex-1 p-1.5 rounded text-xs transition-all ${
                    annotationType === type
                      ? "bg-white shadow-sm font-bold text-purple-600"
                      : "hover:bg-gray-300 text-gray-600"
                  }`}
                >
                  {type === "arrow" && "↗️"}
                  {type === "text" && "T"}
                  {type === "rectangle" && "▭"}
                  {type === "circle" && "○"}
                </button>
              ),
            )}
          </div>
          {annotations.length > 0 && (
            <button
              onClick={() => setAnnotations([])}
              className="w-full py-1.5 text-[10px] bg-red-50 text-red-600 hover:bg-red-100 rounded border border-red-200 transition-colors"
            >
              Clear All Annotations ({annotations.length})
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Annotation;
