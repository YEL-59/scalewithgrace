import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "@/lib/axios.config";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export const useWeeklyCareerGoalSet = (onCreated) => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      const payload = {
        title: values.title,
        description: values.description,
      };
      const { data } = await axiosPrivate.post("/weeks", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Weekly goal created!");
      form.reset();
      const id = data?.data?.id;
      if (id) {
        onCreated?.(id);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Goal creation failed");
    },
  });

  return {
    form,
    mutate,
    isPending,
  };
};

//fetch all weekend task
export const useFetchAllWeekDetails = () => {
  return useQuery({
    queryKey: ["allWeeks"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/weeks`);
      return data;
    },
    onError: () => {
      toast.error("Failed to fetch all week details");
    },
  });
};

//fetch single week task

export const useFetchSingleWeekDetails = ({ id }) => {
  return useQuery({
    queryKey: ["weekDetails", id],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/weeks/${id}`);
      return data;
    },
    enabled: !!id,
    onError: () => {
      toast.error("Failed to fetch week details");
    },
  });
};

//mark week completed
export const useMarkWeekCompleted = () => {
  return useMutation({
    mutationFn: async (weekId) => {
      const { data } = await axiosPrivate.post(
        `/weeks/mark-as-completed/${weekId}`
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Marked as completed!");
    },
    onError: () => {
      toast.error("Failed to mark as completed.");
    },
  });
};

// hooks/use-task-completion.hook.js

export const useTaskCompletion = () => {
  const { mutate: markWeekCompleted } = useMarkWeekCompleted();

  const { mutate: toggleTask, isPending } = useMutation({
    mutationFn: async ({ taskId }) => {
      const { data } = await axiosPrivate.post(
        `/weekly-tasks/mark-as-complete-single-task/${taskId}`
      );
      return data;
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  const handleToggle = ({
    taskId,
    weekId,
    currentStatus,
    tasks,
    setTaskData,
  }) => {
    toggleTask(
      { taskId },
      {
        onSuccess: () => {
          const updatedTasks = tasks.map((task) =>
            task.id === taskId
              ? { ...task, is_completed: !currentStatus }
              : task
          );

          const allCompleted = updatedTasks.every((task) => task.is_completed);

          // Step 3: If all are done, mark week completed
          if (allCompleted) {
            markWeekCompleted(weekId);
          }

          // Step 4: Update UI
          setTaskData((prev) => ({
            ...prev,
            tasks: updatedTasks,
            completed: allCompleted,
          }));
        },
      }
    );
  };

  return {
    toggleTask: handleToggle,
    isPending,
  };
};

// ✅ Create a new weekly task
export const useAddWeeklyTask = (onSuccessCallback) => {
  return useMutation({
    mutationFn: async ({ title, weekId }) => {
      const { data } = await axiosPrivate.post("/weekly-tasks", {
        title,
        week_id: weekId,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Task added successfully!");
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add weekly task"
      );
    },
  });
};
