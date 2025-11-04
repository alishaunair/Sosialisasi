import { useQuery } from "@tanstack/react-query";
import authServices from "@/services/auth.service";

const useProfile = () => {
  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: authServices.getProfile,
  });

  return {
    profile: profileResponse?.data?.data,
    isLoading,
  };
};

export default useProfile;
