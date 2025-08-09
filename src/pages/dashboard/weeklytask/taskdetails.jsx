import { useParams } from "react-router";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddWeeklyTask,
  useFetchSingleWeekDetails,
  useTaskCompletion,
} from "@/hooks/weekly-task.hook";

const TaskDetail = () => {
  const { id: weekId } = useParams();
  const [newTask, setNewTask] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const {
    data: response,
    refetch,
    isLoading,
  } = useFetchSingleWeekDetails({ id: weekId });

  const week = response?.data;
  const tasks = week?.weekly_tasks || [];

  const { mutate: addTask, isPending } = useAddWeeklyTask(() => {
    refetch();
    setNewTask("");
    setOpenModal(false);
  });

  const { completeTask } = useTaskCompletion();
  //sorry for the naming convention, this is a bit confusing here are toggle are one time complete toggle not complete.
  const toggleStep = (taskId, isCompleted) => {
    completeTask({
      taskId,
      weekId,
      currentStatus: isCompleted,
      tasks,
      setTaskData: refetch,
    });
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask({ title: newTask.trim(), weekId });
    }
  };

  const progress = tasks.length
    ? Math.round(
        (tasks.filter((t) => t.is_completed).length / tasks.length) * 100
      )
    : 0;

  if (isLoading) return <p className="p-6">Loading task details...</p>;
  if (!week || !Array.isArray(tasks))
    return <p className="p-6">No task found</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="bg-white mt-4 rounded-xl shadow">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-xl text-white">
          <h2 className="text-xl font-bold">{week.title} - Task Details</h2>
          <p className="text-sm">Click to mark tasks as complete</p>
        </div>
        <div className="mb-4 p-5">
          <p className="font-semibold text-sm">Progress</p>
          <Progress value={progress} className="h-2 mt-1" />
          <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white mt-4 p-6 rounded-xl shadow">
        <div className="space-y-3 mt-6">
          {tasks.map((task) => (
            <label
              key={task.id}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition ${
                task.is_completed
                  ? "bg-gradient-to-r from-teal-500 to-indigo-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => toggleStep(task.id, task.is_completed)}
                  className="w-5 h-5 accent-green-600"
                />
                <span>{task.title}</span>
              </div>
              {task.is_completed && <span>✅</span>}
            </label>
          ))}

          {/* Add Task Button */}
          <div>
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-gradient-to-r from-primary to-secondary rounded-full w-full"
            >
              Add new weekly task
            </Button>
          </div>
        </div>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#191919] text-start text-[28px] font-semibold leading-none">
              Add New Task
            </DialogTitle>
            <p className="text-[#717171] text-md font-normal leading-none mt-1">
              Add a new custom task for this week
            </p>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Label htmlFor="task">Enter Task</Label>
            <Input
              id="task"
              placeholder="Enter task title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              disabled={isPending}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              className="bg-gradient-to-r from-primary to-secondary text-white hover:text-white"
              variant="outline"
              onClick={() => setOpenModal(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-primary to-secondary"
              onClick={handleAddTask}
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskDetail;
