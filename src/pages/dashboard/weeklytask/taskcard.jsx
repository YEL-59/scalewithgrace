import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

const TaskCard = ({ task, onToggle, onOpen }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleTasks = showAll ? task.tasks : task.tasks.slice(0, 3);
  // Prevent checkbox clicks from bubbling to card click handler
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={onOpen}
      className={`border rounded-[16px] p-4 relative border-[#717171] border-l-4 pt-2 mt-4 ${
        task.completed ? "bg-green-50" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={task.completed}
            onCheckedChange={onToggle}
            onClick={handleCheckboxClick}
          />
          <span className="text-sm font-semibold">{task.week}</span>
          {task.completed && <Badge className="text-xs">Completed</Badge>}
        </div>
        <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500 cursor-pointer" />
      </div>

      {/* Tasks */}
      <ul className="mt-3 pl-6 list-disc text-sm text-gray-700 space-y-1">
        {visibleTasks.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      {/* View more / less */}
      {task.tasks.length > 3 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowAll((prev) => !prev);
          }}
          className="text-sm text-blue-600 hover:underline mt-2 ml-6"
        >
          {showAll ? "View less" : "View more"}
        </button>
      )}

      {/* Created at */}
      <p className="text-xs text-gray-400 mt-2">🕒 Created: {task.createdAt}</p>
    </div>
  );
};

export default TaskCard;
