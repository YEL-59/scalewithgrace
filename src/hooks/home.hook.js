import { axiosPublic } from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetHomepage = () => {
  return useQuery({
    queryKey: ["hero-section"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/cms/home-page/hero-section");

      console.log(data);
      if (!data?.status) {
        throw new Error(data?.message || "Failed to fetch hero section");
      }

      return data.data;
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    },
  });
};
