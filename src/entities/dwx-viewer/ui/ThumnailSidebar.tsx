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
       <div className="p-3  h-[400px]">
  {/* Create rows of 4 thumbnails each */}
  {Array.from({ length: Math.ceil(images.length / 4) }).map(
    (_, rowIndex) => {
      const firstIndex = rowIndex * 4;
      const secondIndex = rowIndex * 4 + 1;
      const thirdIndex = rowIndex * 4 + 2;
      const fourthIndex = rowIndex * 4 + 3;
      return (
        <div key={rowIndex} className="grid grid-cols-4 gap-3 mb-3">
          {/* First thumbnail */}
          {firstIndex < images.length && (
            <div
              onClick={() => handleThumbnailClick(firstIndex)}
              className="cursor-pointer"
            >
              <div
                className={`relative rounded overflow-hidden transition-all ${
                  firstIndex === currentIndex
                    ? "ring-2 ring-blue-500 shadow-lg"
                    : "hover:ring-2 hover:ring-gray-400"
                }`}
              >
                <img
                  src={images[firstIndex]}
                  alt={`Thumbnail ${firstIndex + 1}`}
                  className="w-full h-24 object-cover"
                />
                <div
                  className={`absolute top-1 left-1 bg-white/90 px-2 py-0.5 rounded text-xs font-semibold ${
                    firstIndex === currentIndex
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {firstIndex + 1}
                </div>
              </div>
            </div>
          )}

          {/* Second thumbnail */}
          {secondIndex < images.length && (
            <div
              onClick={() => handleThumbnailClick(secondIndex)}
              className="cursor-pointer"
            >
              <div
                className={`relative rounded overflow-hidden transition-all ${
                  secondIndex === currentIndex
                    ? "ring-2 ring-blue-500 shadow-lg"
                    : "hover:ring-2 hover:ring-gray-400"
                }`}
              >
                <img
                  src={images[secondIndex]}
                  alt={`Thumbnail ${secondIndex + 1}`}
                  className="w-full h-24 object-cover"
                />
                <div
                  className={`absolute top-1 left-1 bg-white/90 px-2 py-0.5 rounded text-xs font-semibold ${
                    secondIndex === currentIndex
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {secondIndex + 1}
                </div>
              </div>
            </div>
          )}

          {/* Third thumbnail */}
          {thirdIndex < images.length && (
            <div
              onClick={() => handleThumbnailClick(thirdIndex)}
              className="cursor-pointer"
            >
              <div
                className={`relative rounded overflow-hidden transition-all ${
                  thirdIndex === currentIndex
                    ? "ring-2 ring-blue-500 shadow-lg"
                    : "hover:ring-2 hover:ring-gray-400"
                }`}
              >
                <img
                  src={images[thirdIndex]}
                  alt={`Thumbnail ${thirdIndex + 1}`}
                  className="w-full h-24 object-cover"
                />
                <div
                  className={`absolute top-1 left-1 bg-white/90 px-2 py-0.5 rounded text-xs font-semibold ${
                    thirdIndex === currentIndex
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {thirdIndex + 1}
                </div>
              </div>
            </div>
          )}
          {/* Fourth thumbnail */}
          {fourthIndex < images.length && (
            <div
              onClick={() => handleThumbnailClick(fourthIndex)}
              className="cursor-pointer"
            >
              <div
                className={`relative rounded overflow-hidden transition-all ${
                  fourthIndex === currentIndex
                    ? "ring-2 ring-blue-500 shadow-lg"
                    : "hover:ring-2 hover:ring-gray-400"
                }`}
              >
                <img
                  src={images[fourthIndex]}
                  alt={`Thumbnail ${fourthIndex + 1}`}
                  className="w-full h-24 object-cover"
                />
                <div
                  className={`absolute top-1 left-1 bg-white/90 px-2 py-0.5 rounded text-xs font-semibold ${
                    fourthIndex === currentIndex
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {fourthIndex + 1}
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
