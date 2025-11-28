import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePageQueryProps {
  defaultPage?: number;
  defaultLimit?: number;
  defaultSearch?: string;
  doctorId?: string;
  userId?: string;
  month?: string;
}

import { useState } from "react";

export function usePageQuery({
  defaultPage = 1,
  defaultLimit = 10,
  defaultSearch = "",
  doctorId,
  userId,
  month,
}: UsePageQueryProps = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(
    () => Number(searchParams.get("page")) || defaultPage
  );
  const [limit, setLimit] = useState(
    () => Number(searchParams.get("limit")) || defaultLimit
  );
  const [search, setSearch] = useState(
    () => searchParams.get("search") || defaultSearch
  );

  const urlDoctorId = searchParams.get("doctorId") || doctorId || "";
  const urlUserId = searchParams.get("userId") || userId || "";
  const urlMonth = searchParams.get("month") || month || "";

  // Sync URL whenever state changes
  useEffect(() => {
    const params: Record<string, string> = {
      search,
      page: String(page),
      limit: String(limit),
    };
    if (doctorId) params.doctorId = doctorId;
    if (userId) params.userId = userId;
    if (month) params.month = month;

    setSearchParams(params, { replace: true });
  }, [page, limit, search, doctorId, userId, month, setSearchParams]);

  return {
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
    doctorId: urlDoctorId,
    userId: urlUserId,
    month: urlMonth,
  };
}
