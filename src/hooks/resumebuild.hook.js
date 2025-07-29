import { axiosPrivate } from "@/lib/axios.config";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useCreateResume = () => {
  const {
    mutate: createResume,
    isPending,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: async (payload) => {
      const response = await axiosPrivate.post("/resumes", payload);
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

export const fetchResume = async (id) => {
  const res = await axiosPrivate.get(`/resumes/${id}`);
  return res.data?.data; // only return the "data" part
};

export const useResume = (id) => {
  return useQuery({
    queryKey: ["resume", id],
    queryFn: () => fetchResume(id),
    enabled: !!id, // only run if id is provided
  });
};
