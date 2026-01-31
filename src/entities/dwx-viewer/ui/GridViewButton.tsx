interface Props {
  setViewMode?: React.Dispatch<React.SetStateAction<number>>;
  viewMode?: number;
}
const GridViewButton = ({ setViewMode, viewMode }: Props) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setViewMode?.(1)}
        className={`p-2 bg-white rounded transition-colors text-xs font-medium border border-[#ebebeb] w-[38px] h-[38px] ${
          viewMode === 1 ? "bg-white shadow-sm" : "hover:bg-gray-200"
        }`}
        title="Single Image"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <rect x="3" y="3" width="14" height="14" rx="2" />
        </svg>
      </button>
      <button
        onClick={() => setViewMode?.(2)}
        className={`p-2 bg-white rounded transition-colors text-xs font-medium border border-[#ebebeb] w-[38px] h-[38px] ${
          viewMode === 2 ? "bg-white shadow-sm" : "hover:bg-gray-200"
        }`}
        title="2 Images"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <rect x="2" y="3" width="7" height="14" rx="1" />
          <rect x="11" y="3" width="7" height="14" rx="1" />
        </svg>
      </button>

      <button
        onClick={() => setViewMode?.(4)}
        className={`p-2 bg-white rounded transition-colors text-xs font-medium border border-[#ebebeb] w-[38px] h-[38px] ${
          viewMode === 4 ? "bg-white shadow-sm" : "hover:bg-gray-200"
        }`}
        title="4 Images"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <rect x="2" y="2" width="7" height="7" rx="1" />
          <rect x="11" y="2" width="7" height="7" rx="1" />
          <rect x="2" y="11" width="7" height="7" rx="1" />
          <rect x="11" y="11" width="7" height="7" rx="1" />
        </svg>
      </button>

      <button
        onClick={() => setViewMode?.(6)}
        className={`p-2 bg-white rounded transition-colors text-xs font-medium border border-[#ebebeb] w-[38px] h-[38px] ${
          viewMode === 6 ? "bg-white shadow-sm" : "hover:bg-gray-200"
        }`}
        title="6 Images"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <rect x="1" y="2" width="5" height="7" rx="1" />
          <rect x="7.5" y="2" width="5" height="7" rx="1" />
          <rect x="14" y="2" width="5" height="7" rx="1" />
          <rect x="1" y="11" width="5" height="7" rx="1" />
          <rect x="7.5" y="11" width="5" height="7" rx="1" />
          <rect x="14" y="11" width="5" height="7" rx="1" />
        </svg>
      </button>
    </div>
  );
};

export default GridViewButton;
