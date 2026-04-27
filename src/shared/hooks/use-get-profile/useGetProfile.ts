import { useGetProfileQuery } from "@/shared/redux/features/profile/profileApi";
import { skipToken } from "@reduxjs/toolkit/query";
import useJWT from "../decode-token/useJWT";
import { useProfileSocket } from "../use-socket/useProfileSocket";

export const useGetProfile = () => {
  const decoded = useJWT();
  const userId: string | undefined = decoded?.id;
  const { data, isLoading, refetch } = useGetProfileQuery(userId ?? skipToken, {
    refetchOnMountOrArgChange: true, // always fetch fresh on mount
  });

  useProfileSocket({
    userId,
    onInactive: refetch,
  });

  const profileStatus = data?.data?.status;
  const profileBillHide = data?.data?.hide_bill;
  const top_margin = data?.data?.top_margin ?? "2";

  return {
    profileData: data?.data,
    status: profileStatus,
    hide_bill: profileBillHide,
    paddingTop: top_margin,
    isProfileLoading: isLoading,
    refetch,
  };
};
