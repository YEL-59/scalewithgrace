import { axiosPrivate } from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGEtCommunityLink = () => {
  return useQuery({
    queryKey: ["community-link"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/community-link`);
      return data;
    },
    onError: () => {
      toast.error("Failed to fetch link");
    },
  });
};
