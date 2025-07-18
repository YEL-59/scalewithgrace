import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TaskCard from "./taskcard";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const initialTasks = [
  {
    id: 1,
    week: "Week 1",
    createdAt: "May 15, 2023",
    tasks: [
      "Update LinkedIn profile",
      "Update Facebook profile",
      "Update Instagram profile",
    ],
    completed: true,
  },
  {
    id: 2,
    week: "Week 2",
    createdAt: "May 22, 2023",
    tasks: [
      "Update LinkedIn profile",
      "Update Facebook profile",
      "Update Instagram profile",
    ],
    completed: true,
  },
  {
    id: 3,
    week: "Week 3",
    createdAt: "May 29, 2023",
    tasks: [
      "Update LinkedIn profile",
      "Update Facebook profile",
      "Update Instagram profile",
      "Update LinkedIn profile",
      "Update Facebook profile",
      "Update Instagram profile",
    ],
    completed: false,
  },
  {
    id: 4,
    week: "Week 4",
    createdAt: "Jun 5, 2023",
    tasks: [
      "Update LinkedIn profile",
      "Update Facebook profile",
      "Update Instagram profile",
    ],
    completed: false,
  },
];

const TaskManager = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const navigate = useNavigate();

  const handleToggle = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  const openTaskDetails = (id) => {
    navigate(`../task/${id}`);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="max-w-container mx-auto p-4">
      <div className="bg-gradient-to-r from-primary to-secondary rounded-t-xl p-6 text-white shadow-md">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <p className="text-sm">Become a project manager</p>
      </div>

      <div className="bg-white p-6 shadow rounded-b-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-semibold">Your Progress</p>
            <p className="text-sm text-gray-500">
              {completedCount} of {tasks.length} tasks complete
            </p>
          </div>
          <Button>+ Add New Task</Button>
        </div>

        <Progress value={progressPercent} className="h-2 mb-6" />
      </div>
      <div className="space-y-4 pt-5">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={() => handleToggle(task.id)}
            onOpen={() => openTaskDetails(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
