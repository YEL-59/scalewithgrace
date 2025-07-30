import { axiosPublic } from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetSystemSection = (section) => {
  return useQuery({
    queryKey: ["about-page-section", section],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/cms/${section}`);

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

//Dynamic route footer

export const useGetDynamicPages = () => {
  const result = useQuery({
    queryKey: ["dynamic_pages"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/dynamic-pages`);
      return res.data;
    },
  });

  const data = result?.data?.data || [];
  return { ...result, data };
};

export const useGetSinglePage = (slug) => {
  const result = useQuery({
    queryKey: ["dynamic_page", slug],
    queryFn: async () => {
      const res = await axiosPublic.get(`/dynamic-pages/single/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  const data = result?.data?.data || {};
  return { ...result, data };
};
