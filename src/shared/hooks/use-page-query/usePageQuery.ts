import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePageQueryProps {
  defaultPage?: number;
  defaultLimit?: number;
}

export function usePageQuery({
  defaultPage = 1,
  defaultLimit = 10,
}: UsePageQueryProps = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // read page & limit from URL or default
  const page = Number(searchParams.get("page")) || defaultPage;
  const limit = Number(searchParams.get("limit")) || defaultLimit;

  // sync URL on initial load if missing
  useEffect(() => {
    const urlPage = searchParams.get("page");
    const urlLimit = searchParams.get("limit");

    if (!urlPage || !urlLimit) {
      setSearchParams({ page: String(page), limit: String(limit) });
    }
  }, [page, limit, searchParams, setSearchParams]);

  // update URL page
  const setPage = (newPage: number) => {
    setSearchParams({ page: String(newPage), limit: String(limit) });
  };

  // update URL limit (resets page)
  const setLimit = (newLimit: number) => {
    setSearchParams({ page: "1", limit: String(newLimit) });
  };

  return { page, limit, setPage, setLimit };
}
