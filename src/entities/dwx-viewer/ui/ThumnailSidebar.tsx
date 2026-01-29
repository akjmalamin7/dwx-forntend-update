interface Props {
  images: string[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  resetView: () => void;
}

const ThumnailSidebar = ({
  images,
  currentIndex,
  setCurrentIndex,
  resetView,
}: Props) => {
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    resetView();
  };
  return (
    <div className="col-span-1 bg-gray-200 border-l border-gray-400 overflow-y-auto">
      <div className="p-3">
        {/* Create rows of 2 thumbnails each */}
        {Array.from({ length: Math.ceil(images.length / 2) }).map(
          (_, rowIndex) => {
            const leftIndex = rowIndex * 2;
            const rightIndex = rowIndex * 2 + 1;

            return (
              <div key={rowIndex} className="grid grid-cols-2 gap-3 mb-3">
                {/* Left thumbnail */}
                {leftIndex < images.length && (
                  <div
                    onClick={() => handleThumbnailClick(leftIndex)}
                    className="cursor-pointer"
                  >
                    <div
                      className={`relative rounded overflow-hidden transition-all ${
                        leftIndex === currentIndex
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "hover:ring-2 hover:ring-gray-400"
                      }`}
                    >
                      <img
                        src={images[leftIndex]}
                        alt={`Thumbnail ${leftIndex + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <div
                        className={`absolute top-1 left-1 bg-white/90 px-2 py-0.5 rounded text-xs font-semibold ${
                          leftIndex === currentIndex
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        {leftIndex + 1}
                      </div>
                    </div>
                  </div>
                )}

                {/* Right thumbnail */}
                {rightIndex < images.length && (
                  <div
                    onClick={() => handleThumbnailClick(rightIndex)}
                    className="cursor-pointer"
                  >
                    <div
                      className={`relative rounded overflow-hidden transition-all ${
                        rightIndex === currentIndex
                          ? "ring-2 ring-blue-500 shadow-lg"
                          : "hover:ring-2 hover:ring-gray-400"
                      }`}
                    >
                      <img
                        src={images[rightIndex]}
                        alt={`Thumbnail ${rightIndex + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <div
                        className={`absolute top-1 left-1 bg-white/90 px-2 py-0.5 rounded text-xs font-semibold ${
                          rightIndex === currentIndex
                            ? "text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        {rightIndex + 1}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default ThumnailSidebar;
