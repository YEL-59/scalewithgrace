import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/axios.config";
import toast from "react-hot-toast";

export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: async (email) => {
      const { data } = await axiosPublic.post("/subscribe-newsletter", {
        email,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Subscribed successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Subscription failed");
    },
  });
};
