import { axiosPrivate } from "@/lib/axios.config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGenerateCoverLetter() {
  return useMutation({
    mutationFn: async ({ prompt_text, file }) => {
      const formData = new FormData();
      formData.append("prompt_text", prompt_text);
      const forcedFile = new File([file], file.name, {
        type: "application/pdf",
      });
      formData.append("file", forcedFile);
      //formData.append("file", file); // must be real File
      console.log("File type:", file.type);
      // Debug output
      console.log("Uploading file:", file);
      console.log("FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axiosPrivate.post(
        "/cover-letters/generate-summary",
        formData
      );

      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error message:", error.message);
        if (error.code === "ECONNABORTED") {
          console.error("Request timed out");
        }
      } else {
        console.error("Unexpected error:", error);
      }
    },
  });
}

//update  cover letter
export function useUpdateCoverLetter() {
  return useMutation({
    mutationFn: async ({ prompt_text, type }) => {
      const formData = new FormData();
      formData.append("prompt_text", prompt_text);
      formData.append("type", type);
      console.log("FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axiosPrivate.post(
        "/cover-letters/generate-text",
        formData
      );

      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error message:", error.message);
        if (error.code === "ECONNABORTED") {
          console.error("Request timed out");
        }
      } else {
        console.error("Unexpected error:", error);
      }
    },
  });
}
//post coverletter

export const useCreateCoverLetter = () => {
  const { mutate, isPending, isSuccess, data, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await axiosPrivate.post("/cover-letters", payload);
      return response.data;
    },
    onSuccess: (res) => {
      console.log("✅ Resume Created:", res.data);
    },
    onError: (err) => {
      console.error("❌ Resume Creation Failed:", err);
    },
  });

  return {
    createCoverLetter: mutate,
    isPending,
    isSuccess,
    data,
    error,
  };
};

//get single coverletter details data
export const useCoverLetterDetails = () => {
  return useQuery({
    queryKey: ["allCoverLetter"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/cover-letters`);
      return data?.data;
    },
  });
};
//delete single cover letter
export const useDeleteCoverLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosPrivate.delete(`/cover-letters/${id}`);
      return data;
    },
    onSuccess: () => {
      // Refetch the cover letter list after deletion
      queryClient.invalidateQueries(["allCoverLetter"]);
    },
  });
};
