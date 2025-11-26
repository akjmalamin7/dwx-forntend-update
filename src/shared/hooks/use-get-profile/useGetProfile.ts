import { useGetProfileQuery } from "@/shared/redux/features/profile/profileApi";
import { skipToken } from "@reduxjs/toolkit/query";
import useJWT from "../decode-token/useJWT";

export const useGetProfile = () => {
  const decoded = useJWT();
  const userId: string | undefined = decoded?.id;
  const { data, isLoading } = useGetProfileQuery(userId ?? skipToken);

  return {
    profileData: data,
    status: data?.status,
    isProfileLoading: isLoading,
  };
};
