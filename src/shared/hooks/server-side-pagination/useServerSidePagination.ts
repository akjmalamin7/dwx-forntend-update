interface UseServerSidePaginationProps<T> {
  data: T[];
  limit?: number;
  page?: number;
}

export function useServerSidePagination({
  data,
  limit = 10,
  page,
}: UseServerSidePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(1);
}
