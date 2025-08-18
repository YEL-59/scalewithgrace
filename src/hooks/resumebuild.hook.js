import { axiosPrivate } from "@/lib/axios.config";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useResumeBuilderSummeryText = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      prompt_text: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      const payload = {
        prompt_text: values.prompt_text,
      };
      const { data } = await axiosPrivate.post(
        "/resumes/generate-summary",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Goal set successfully!");
      localStorage.setItem("resumeSummary", data?.data);
      form.reset(); // Optional: reset form on success

      navigate("/dashboard/resumeBuild-step", {
        state: {
          summary: data?.data,
        },
      });
    },
    onError: (error) => {
      console.error("Full Error:", error);
      toast.error(error?.response?.data?.message || "Goal set failed");
    },
  });

  return {
    form,
    mutate,
    isPending,
  };
};
//throw resume upload
// export function useGenerateResumeByFilePrompt() {
//   const navigate = useNavigate();
//   return useMutation({
//     mutationFn: async ({ prompt_text, file }) => {
//       const formData = new FormData();
//       formData.append("prompt_text", prompt_text);
//       const forcedFile = new File([file], file.name, {
//         type: "application/pdf",
//       });
//       formData.append("file", forcedFile);
//       //formData.append("file", file); // must be real File
//       console.log("File type:", file.type);
//       // Debug output
//       console.log("Uploading file:", file);
//       console.log("FormData:");
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       const response = await axiosPrivate.post("/resumes/generate", formData);

//       return response.data;
//     },
//     onSuccess: (data) => {
//       toast.success(data?.message || "Goal set successfully!");
//       localStorage.setItem("resumeUploaddata", data?.data);

//       navigate("/dashboard/resumeBuild-step", {
//         state: {
//           generatedResume: data.data, // pass the whole resume object
//         },
//       });
//     },
//     onError: (error) => {
//       if (axios.isAxiosError(error)) {
//         console.error("Axios error message:", error.message);
//         if (error.code === "ECONNABORTED") {
//           console.error("Request timed out");
//         }
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     },
//   });
// }

export function useGenerateResumeByFilePrompt() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ prompt_text, file }) => {
      const formData = new FormData();
      formData.append("prompt_text", prompt_text);
      const forcedFile = new File([file], file.name, {
        type: "application/pdf",
      });
      formData.append("file", forcedFile);

      const response = await axiosPrivate.post("/resumes/generate", formData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Resume generated!");
      localStorage.setItem("resumeUploaddata", data?.data);

      navigate("/dashboard/resumeBuild-step", {
        state: { generatedResume: data.data },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return mutation; // ✅ return the whole mutation object
}

export const useCreateResume = () => {
  const {
    mutate: createResume,
    isPending,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: async (payload) => {
      const response = await axiosPrivate.post("/resumes", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (res) => {
      toast.success(res?.message || "Resume created successfully!");
      console.log("✅ Resume Created:", res.data);
    },
    onError: (err) => {
      console.error("❌ Resume Creation Failed:", err);
      toast.error(err?.response?.data?.message || "Failed to create resume.");
    },
  });

  const resumeId = data?.data?.id;
  return {
    createResume, // Call this with your payload
    isPending,
    isSuccess,
    data, // contains: res.data
    resumeId,
    error,
  };
};

export function useResumeById(resumeId) {
  return useQuery({
    queryKey: ["resume", resumeId],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/resumes/${resumeId}`);
      return data.data;
    },
    enabled: !!resumeId,
    staleTime: 5 * 60 * 1000,
  });
}

// export const fetchResume = async (id) => {
//   const res = await axiosPrivate.get(`/resumes/${id}`);
//   return res.data?.data; // only return the "data" part
// };

// export const useResume = (id) => {
//   return useQuery({
//     queryKey: ["resume", id],
//     queryFn: () => fetchResume(id),
//     enabled: !!id, // only run if id is provided
//   });
// };
