import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TaskCard from "./taskcard";
import {
  useFetchAllWeekDetails,
  useTaskCompletion,
} from "@/hooks/weekly-task.hook";
import { Link } from "react-router";

const TaskManager = () => {
  const { data, isLoading, error } = useFetchAllWeekDetails();
  const { toggleTask } = useTaskCompletion();

  // State: array of weeks with tasks
  const [weeksData, setWeeksData] = useState([]);

  const [globalMeta, setGlobalMeta] = useState(null);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    console.log("Fetched data:", data);
    if (data?.data?.data) {
      // 👇 Set global progress meta
      if (data.data.meta) {
        setGlobalMeta(data.data.meta);
      }

      // const mappedWeeks = data.data.data.map((week) => ({
      //   id: week.id,
      //   week: `Week ${week.week_number}`,
      //   title: week.title,
      //   description: week.description,
      //   createdAt: new Date(week.created_at).toDateString(),
      //   tasks: Array.isArray(week.weekly_tasks)
      //     ? week.weekly_tasks.map((t) => ({
      //         id: t.id,
      //         title: t.title,
      //         is_completed: t.is_completed,
      //       }))
      //     : [],
      //   completed: Array.isArray(week.weekly_tasks)
      //     ? week.weekly_tasks.every((t) => t.is_completed)
      //     : false,
      // }));

      const mappedWeeks = data.data.data
        .map((week) => ({
          id: week.id,
          week: `Week ${week.week_number}`,
          title: week.title,
          description: week.description,
          createdAt: new Date(week.created_at).toISOString(), // for easier sorting
          tasks: Array.isArray(week.weekly_tasks)
            ? week.weekly_tasks.map((t) => ({
                id: t.id,
                title: t.title,
                is_completed: t.is_completed,
              }))
            : [],
          completed: Array.isArray(week.weekly_tasks)
            ? week.weekly_tasks.every((t) => t.is_completed)
            : false,
        }))
        // 🧠 Sort: incomplete weeks first, then by date descending **Group incomplete weeks first, then completed weeks.**Within each group, sort by date descending (newest first).

        // .filter((week) => week.tasks.length > 0) // Filter out weeks with no tasks
        // .map((week) => ({
        //   ...week,
        // }))
        .sort((a, b) => {
          if (a.completed === b.completed) {
            return new Date(b.createdAt) - new Date(a.createdAt); // recent first
          }

          return a.completed ? 1 : -1; // incomplete before complete
        });

      setWeeksData(mappedWeeks);
    }
  }, [data]);

  const toggleTaskCompletion = (weekId, taskId) => {
    const week = weeksData.find((w) => w.id === weekId);
    if (!week) return;

    toggleTask({
      taskId,
      weekId,
      currentStatus: week.tasks.find((t) => t.id === taskId)?.is_completed,
      tasks: week.tasks,
      setTaskData: (updatedWeek) => {
        setWeeksData((prevWeeks) =>
          prevWeeks.map((w) => (w.id === weekId ? updatedWeek : w))
        );
      },
    });
  };

  if (isLoading) return <p>Loading all weeks...</p>;
  if (error) return <p>Failed to load weeks.</p>;

  return (
    <div className="max-w-container mx-auto p-4">
      <div className="bg-gradient-to-r from-primary to-secondary rounded-t-xl p-6 text-white ">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <p className="text-sm">Manage your weekly tasks</p>
      </div>
      <div className="bg-white rounded p-4 mb-6">
        <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-full">
            <p className="font-semibold text-lg">Overall Progress</p>
            {globalMeta ? (
              <>
                <p className="text-sm text-gray-500">
                  {globalMeta.completed_count} of {globalMeta.total_tasks} tasks
                  completed
                </p>
                <div className="w-full mt-2">
                  <Progress
                    value={globalMeta.completion_percentage}
                    className="h-2 w-full"
                  />
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">Loading progress...</p>
            )}
          </div>
          <Link to="/dashboard/weekly-task">
            {" "}
            <Button className="bg-gradient-to-r from-primary to-secondary whitespace-nowrap">
              Add New Task +
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-2 mb-4 text-white">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className="bg-gradient-to-r from-primary to-secondary whitespace-nowrap"
        >
          All
        </Button>
        <Button
          variant={filter === "incomplete" ? "default" : "outline"}
          onClick={() => setFilter("incomplete")}
          className="bg-gradient-to-r from-primary to-secondary whitespace-nowrap"
        >
          Incomplete
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
          className="bg-gradient-to-r from-primary to-secondary whitespace-nowrap"
        >
          Completed
        </Button>
      </div>

      <div className="  rounded-b-xl space-y-6">
        {weeksData.length === 0 && <p>No weekly tasks found.</p>}
        {weeksData
          .filter((week) => {
            if (filter === "all") return true;
            if (filter === "incomplete") return !week.completed;
            if (filter === "completed") return week.completed;
          })
          .map((week) => {
            if (!Array.isArray(week.tasks)) return null; // 👈 Guard clause

            const progressPercent = Math.round(
              (week.tasks.filter((t) => t.is_completed).length /
                week.tasks.length) *
                100
            );

            return (
              <div
                key={week.id}
                className="bg-white border rounded-xl p-5 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">
                      {week.title} Progress
                    </p>
                    <p className="text-sm text-gray-500">
                      {week.tasks.filter((t) => t.is_completed).length} of{" "}
                      {week.tasks.length} tasks complete
                    </p>
                  </div>
                </div>

                <Progress value={progressPercent} className="h-2" />

                <Link to={`/dashboard/task/${week.id}`}>
                  <TaskCard
                    task={week}
                    onToggle={(taskId) => toggleTaskCompletion(week.id, taskId)}
                    onOpen={() => {}} // optional
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TaskManager;
