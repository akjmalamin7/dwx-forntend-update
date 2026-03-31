import { useGetAdminPatientFilterListQuery } from "../api/query";

export const usePatientFilter = () => {
  const { data, error, isLoading } = useGetAdminPatientFilterListQuery({
    page: 1,
    limit: 10,
  });

  return {
    data,
    error,
    isLoading,
  };
};
