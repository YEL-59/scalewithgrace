import { axiosPublic } from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetFeaturePageSection = (section) => {
  return useQuery({
    queryKey: ["feature-page-section", section],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/cms/feature-page/${section}`);

      console.log(`${section} data:`, data);

      if (!data?.status) {
        throw new Error(data?.message || `Failed to fetch ${section}`);
      }

      return data.data;
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        `Error loading ${section}`;
      toast.error(message);
    },
  });
};

//feature page

export const useGetFeatureSection = () => {
  return useQuery({
    queryKey: ["feature-home-section"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/cms/feature-page/feature-section`
      );

      console.log("data:", data);

      if (!data?.status) {
        throw new Error(data?.message || `Failed to fetch `);
      }

      return data.data;
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || error.message || `Error loading `;
      toast.error(message);
    },
  });
};
