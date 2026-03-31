import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePageQueryProps {
  defaultPage?: number;
  defaultLimit?: number;
  defaultSearch?: string;
  doctorId?: string;
  userId?: string;
  month?: string;
  startDate?: string;
  endDate?: string;
}

import { useState } from "react";

export function usePageQuery({
  defaultPage = 1,
  defaultLimit = 100,
  defaultSearch = "",
  doctorId,
  userId,
  month,
  startDate,
  endDate,
}: UsePageQueryProps = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(
    () => Number(searchParams.get("page")) || defaultPage,
  );
  const [limit, setLimit] = useState(
    () => Number(searchParams.get("limit")) || defaultLimit,
  );
  const [search, setSearch] = useState(
    () => searchParams.get("search") || defaultSearch,
  );

  const urlStartDate = searchParams.get("start_date") || startDate || "";
  const urlEndDate = searchParams.get("end_date") || endDate || "";

  const urlDoctorId = searchParams.get("doctorId") || doctorId || "";
  const urlUserId = searchParams.get("userId") || userId || "";
  const urlMonth = searchParams.get("month") || month || "";

  const [startDateState, setStartDate] = useState(urlStartDate);
  const [endDateState, setEndDate] = useState(urlEndDate);

  // Sync URL whenever state changes
  useEffect(() => {
    const params: Record<string, string> = {
      // search,
      page: String(page),
      limit: String(limit),
    };
    if (search) {
      params.search = search;
    }
    // if (doctorId) params.doctorId = doctorId;
    // if (userId) params.userId = userId;
    // if (month) params.month = month;
    if (urlDoctorId) params.doctorId = urlDoctorId;
    if (urlUserId) params.userId = urlUserId;
    if (urlMonth) params.month = urlMonth;

    if (startDateState) params.start_date = startDateState;
    if (endDateState) params.end_date = endDateState;

    setSearchParams(params, { replace: true });
  }, [
    page,
    limit,
    search,
    urlDoctorId,
    urlUserId,
    urlMonth,
    startDateState,
    endDateState,
    setSearchParams,
  ]);
  // [page, limit, search, doctorId, userId, month, setSearchParams]
  return {
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
    startDate: startDateState,
    endDate: endDateState,
    setStartDate,
    setEndDate,
    doctorId: urlDoctorId,
    userId: urlUserId,
    month: urlMonth,
  };
}
