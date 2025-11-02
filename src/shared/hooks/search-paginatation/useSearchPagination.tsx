import { useEffect, useMemo, useState } from "react";

interface UsePatientTableProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  rowsPerPage?: number;
}

export function useSearchPagination<T extends Record<string, unknown>>({
  data,
  searchFields,
  rowsPerPage = 10,
}: UsePatientTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }

    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (value !== undefined && value !== null) {
          return String(value).toLowerCase().includes(lowerQuery);
        }
        return false;
      })
    );
  }, [data, searchQuery, searchFields]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, data]);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    filteredData,
    paginatedData,
    totalPages,
    rowsPerPage,
    goToPreviousPage,
    goToNextPage,
    goToPage,
    hasData: data.length > 0,
    hasFilteredData: filteredData.length > 0,
    totalItems: data.length,
    filteredItems: filteredData.length,
  };
}
