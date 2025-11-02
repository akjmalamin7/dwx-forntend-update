import { useCallback, useEffect, useState } from "react";

interface UseServerSidePaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

export function useServerSidePagination({
  totalPages,
  initialPage = 1,
  onPageChange,
}: UseServerSidePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const changePage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
      onPageChange?.(page);
    },
    [onPageChange, totalPages]
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return {
    currentPage,
    totalPages,
    onPageChange: changePage,
    goToNextPage: () => hasNext && changePage(currentPage + 1),
    goToPrevPage: () => hasPrev && changePage(currentPage - 1),
  };
}
