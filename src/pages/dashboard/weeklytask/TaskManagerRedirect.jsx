import { useFetchAllWeekDetails } from "@/hooks/weekly-task.hook";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const TaskManagerRedirect = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetchAllWeekDetails();

  useEffect(() => {
    if (isLoading) return;

    const weekData = data?.data?.data || [];

    if (Array.isArray(weekData) && weekData.length > 0) {
      // Redirect to the first or latest week's task manager
      const latestWeek = weekData[0]; // or use sort to get the latest
      navigate(`/dashboard/task-manager/${latestWeek.id}`);
    } else {
      // No weekly task exists yet
      navigate("/dashboard/weekly-task");
    }
  }, [data, isLoading, navigate]);

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading tasks</p>;

  return null; // Optional fallback while redirecting
};

export default TaskManagerRedirect;
