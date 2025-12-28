interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  onPageChange: (page: number) => void;
}
const ServerSidePagination = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    let prev: number | null = null;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        if (prev && i - prev > 1) pages.push("...");
        pages.push(i);
        prev = i;
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-between items-center mt-4 px-4">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
        disabled={!hasPrev}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <div className="space-x-1 text-sm flex items-center">
        {pageNumbers.map((num, idx) =>
          num === "..." ? (
            <span key={`dots-${idx}`} className="px-1">
              ...
            </span>
          ) : (
            <button
              key={`page-${num}`}
              className={`px-3 py-1 rounded transition-colors ${
                num === currentPage
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => onPageChange(num as number)}
            >
              {num}
            </button>
          )
        )}
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default ServerSidePagination;
