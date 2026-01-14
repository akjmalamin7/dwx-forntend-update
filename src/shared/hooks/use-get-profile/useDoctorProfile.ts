import { useGetDoctorProfileQuery } from "@/shared/redux/features/doctor-profile/doctorProfile";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAuth } from "../use-auth/useAuth";

export const useDoctorProfile = () => {
  const { user } = useAuth();

  const { data, isLoading, error } = useGetDoctorProfileQuery(
    user?.id ?? skipToken
  );

  return {
    profileData: data?.data,
    status: data?.data?.status,
    isProfileLoading: isLoading,
    error: error,
  };
};
