// import { axiosPrivate } from "@/lib/axios.config";
// import { useMutation } from "@tanstack/react-query";

// // Helper to format form data to match API spec
// const transformToAPIFormat = (data) => {
//   return Object.entries(data).map(([key, value]) => ({
//     key,
//     value,
//     type: "text",
//     uuid: crypto.randomUUID(),
//   }));
// };

// export const useCoachMatch = () => {
//   return useMutation({
//     mutationFn: async (formData) => {
//       const payload = transformToAPIFormat(formData);
//       const response = await axiosPrivate.post("/coach-matches", payload);
//       return response.data;
//     },
//   });
// };

import { axiosPrivate } from "@/lib/axios.config";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Format form data for API
const transformToAPIFormat = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    key,
    value,
    //type: "text",
    // uuid: crypto.randomUUID(),
  }));
};

export const useCoachMatch = () => {
  return useMutation({
    mutationFn: async (formData) => {
      // const payload = transformToAPIFormat(formData);
      const response = await axiosPrivate.post("/coach-matches", formData);
      return response.data;
    },

    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data.message || "Match created successfully");
      } else {
        toast.error("Failed to create match");
      }
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create match";
      toast.error(message);
    },
  });
};
