import { axiosPrivate } from "@/lib/axios.config";
import { useMutation } from "@tanstack/react-query";
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
