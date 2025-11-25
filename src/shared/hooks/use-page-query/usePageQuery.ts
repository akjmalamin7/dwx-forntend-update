import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePageQueryProps {
  defaultPage?: number;
  defaultLimit?: number;
  doctorId?: string;
  userId?: string;
  month?: string;
}

export function usePageQuery({
  defaultPage = 1,
  defaultLimit = 10,
  doctorId,
  userId,
  month,
}: UsePageQueryProps = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || defaultPage;
  const limit = Number(searchParams.get("limit")) || defaultLimit;

  const urlDoctorId = searchParams.get("doctorId") || doctorId || "";
  const urlUserId = searchParams.get("userId") || userId || "";
  const urlMonth = searchParams.get("month") || month || "";

  // Sync URL on initial load if missing
  useEffect(() => {
    const params: Record<string, string> = {
      page: String(page),
      limit: String(limit),
    };
    if (urlDoctorId) params.doctorId = urlDoctorId;
    if (urlUserId) params.userId = urlUserId;
    if (urlMonth) params.month = urlMonth;

    setSearchParams(params);
  }, [page, limit, urlDoctorId, urlMonth, urlUserId, setSearchParams]);

  // Update page while keeping other params
  const setPage = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
      limit: String(limit),
      doctorId: urlDoctorId,
      userId: urlUserId,
      month: urlMonth,
    });
  };

  // Update limit while keeping other params
  const setLimit = (newLimit: number) => {
    setSearchParams({
      page: "1",
      limit: String(newLimit),
      doctorId: urlDoctorId,
      userId: urlUserId,
      month: urlMonth,
    });
  };

  return {
    page,
    limit,
    setPage,
    setLimit,
    doctorId: urlDoctorId,
    userId: urlUserId,
    month: urlMonth,
  };
}
