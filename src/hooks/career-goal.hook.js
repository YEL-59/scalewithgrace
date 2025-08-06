import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/axios.config";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setRoadmap } from "@/redux/slices/roadmapSlice";
import { useNavigate } from "react-router";

export const useCareerGoalSet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      roadmap_name: "",
      prompt: "",
      duration: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      const payload = {
        roadmap_name: values.roadmap_name,
        duration: Number(values.duration),
        prompt: values.prompt,
      };
      const { data } = await axiosPrivate.post("/career-goals", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Goal set successfully!");
      form.reset(); // Optional: reset form on success
      dispatch(setRoadmap(data?.data)); // ✅ Store in Redux
      // ✅ Invalidate the cache to refetch updated goals
      queryClient.invalidateQueries(["career-goals"]);

      navigate("/dashboard/career-road-map"); // ✅ Redirect
    },
    onError: (error) => {
      dispatch(setRoadmap(null));
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

//get all goal list

export const useGetCareerGoals = () => {
  return useQuery({
    queryKey: ["career-goals"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/career-goals");

      if (!data?.status) {
        throw new Error(data?.message || "Failed to fetch career goals");
      }

      return data.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 1, // retry once on failure
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Failed to load goals";
      toast.error(message);
    },
  });
};

//get single roadmap details data
export const useCareerGoalDetails = (goalId) => {
  return useQuery({
    queryKey: ["career-goal", goalId],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/career-goals/${goalId}`);
      return data?.data;
    },
    enabled: !!goalId, // only run if goalId is not null/undefined
    staleTime: 1000 * 60 * 5, // 5 mins cache
  });
};

//week task complete checkbox
export const useWeekTaskComplete = () => {
  return useMutation({
    mutationFn: async (weekId) => {
      const { data } = await axiosPrivate.post(
        `/career-goals/week-mark-as-completed/${weekId}`
      );
      return data?.data;
    },
  });
};
