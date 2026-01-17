import { useGetDoctorProfileQuery } from "@/shared/redux/features/doctor-profile/doctorProfile";

export const useDoctorProfile = () => {
  const { data, isLoading, error } = useGetDoctorProfileQuery();

  return {
    profileData: data?.data,
    status: data?.data?.status,
    isProfileLoading: isLoading,
    error: error,
  };
};
