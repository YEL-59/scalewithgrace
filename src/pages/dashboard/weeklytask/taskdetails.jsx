import { useParams } from "react-router";
import { useState, useEffect } from "react";
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

const mockTasks = [
  {
    id: 1,
    title: "Week 1",
    steps: [
      "Update LinkedIn profile",
      "Update Facebook profile",
      "Update Instagram profile",
    ],
  },
  {
    id: 3,
    title: "Week 3",
    steps: [
      "Update LinkedIn profile",
      "Update Facebook profile",
      "Update Instagram profile",
      "Write a blog post",
    ],
  },
];

const TaskDetail = () => {
  const { id } = useParams();
  const task = mockTasks.find((t) => t.id === Number(id));

  const [completedSteps, setCompletedSteps] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (task) {
      setCompletedSteps(Array(task.steps.length).fill(false));
    }
  }, [task]);

  if (!task) return <p className="p-6">Task not found</p>;

  const toggleStep = (index) => {
    setCompletedSteps((prev) =>
      prev.map((completed, i) => (i === index ? !completed : completed))
    );
  };

  const progress = Math.round(
    (completedSteps.filter(Boolean).length / task.steps.length) * 100
  );

  const handleAddTask = () => {
    if (newTask.trim()) {
      task.steps.push(newTask);
      setCompletedSteps([...completedSteps, false]);
      setNewTask("");
      setOpenModal(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white mt-4 rounded-xl shadow">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-xl text-white">
          <h2 className="text-xl font-bold">{task.title} - Task Details</h2>
          <p className="text-sm">Click to mark steps as complete</p>
        </div>
        <div className="mb-4 p-5">
          <p className="font-semibold text-sm">Progress</p>
          <Progress value={progress} className="h-2 mt-1" />
          <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
        </div>
      </div>

      <div className="bg-white mt-4 p-6 rounded-xl shadow">
        <div className="space-y-3 mt-6">
          {task.steps.map((step, index) => (
            <label
              key={index}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition ${
                completedSteps[index]
                  ? "bg-gradient-to-r from-teal-500 to-indigo-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={completedSteps[index]}
                  onChange={() => toggleStep(index)}
                  className="w-5 h-5 accent-green-600"
                />
                <span>{step}</span>
              </div>
              {completedSteps[index] && <span>✅</span>}
            </label>
          ))}

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

      {/* Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#191919] text-start text-[34px] font-semibold leading-none">
              Add New Task
            </DialogTitle>

            <p className="text-[#717171]  text-md font-normal leading-none">
              Add new custom task here
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="task">Enter Task</Label>
            <Input
              id="task"
              placeholder="Enter task title"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              className="bg-gradient-to-r from-primary to-secondary text-white hover:text-white"
              variant="outline"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-primary to-secondary"
              onClick={handleAddTask}
            >
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskDetail;
