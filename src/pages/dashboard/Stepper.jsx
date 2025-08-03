import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useTaskCompletion } from "@/hooks/weekly-task.hook";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetDashboard } from "@/hooks/subscription.hook";

function Stepper() {
  const { data: dashboard } = useGetDashboard();
  const weeklyPlan = dashboard?.running_weekly_tasks?.[0]; // First weekly plan
  const weeklyTasks = weeklyPlan?.weekly_tasks ?? [];
  console.log("Weekly Tasks:", weeklyPlan);
  const [tasks, setTasks] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const { completeTask: toggleTask, isPending } = useTaskCompletion();

  useEffect(() => {
    if (weeklyTasks.length > 0) {
      setTasks(
        weeklyTasks.map((task) => ({
          id: task.id,
          title: task.title,
          completed: task.is_completed,
        }))
      );

      // Move current step to first incomplete task
      const firstIncompleteIndex = weeklyTasks.findIndex(
        (task) => !task.is_completed
      );
      setCurrentStep(firstIncompleteIndex === -1 ? 0 : firstIncompleteIndex);
    }
  }, [weeklyTasks]);

  const handleTaskClick = (taskId, index, currentStatus) => {
    if (index !== currentStep || isPending) return; // Only allow clicking current step

    toggleTask({
      taskId,
      weekId: weeklyPlan.id,
      currentStatus,
      tasks: tasks.map((t) => ({ ...t, is_completed: t.completed })), // convert UI to API format
      setTaskData: ({ tasks: newTasks }) => {
        // Update UI state
        setTasks(
          newTasks.map((t) => ({
            id: t.id,
            title: t.title,
            completed: t.is_completed,
          }))
        );

        // Move to next step if available
        const nextIndex = index + 1;
        if (nextIndex < newTasks.length) {
          setCurrentStep(nextIndex);
        }
      },
    });
  };

  return (
    <div className=" p-3">
      <div className="col-span-1 lg:col-span-2">
        <div>
          {tasks.length > 0 ? (
            <div className="shadow-lg my-4 rounded-[36px] p-11 bg-white space-y-6 text-primary font-medium relative">
              {/* Vertical Line */}
              <div className="absolute left-[52.5px] top-[70px] bottom-[44px] w-1 bg-[#E9E9EA]">
                <div
                  className="w-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                  style={{
                    height: `${(currentStep / (tasks.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {tasks.map((task, index) => (
                <div key={task.id} className="relative">
                  <div className="flex items-center gap-4">
                    <div className="relative z-10 bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="transition-all duration-200"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9.5"
                          fill={
                            task.completed
                              ? "#504999 "
                              : index === currentStep
                              ? "#504999 "
                              : "white"
                          }
                          stroke={
                            task.completed
                              ? "#504999 "
                              : index === currentStep
                              ? "#504999 "
                              : "#E9E9EA"
                          }
                          strokeWidth="1"
                        />
                      </svg>
                      {task.completed && (
                        <Check
                          size={14}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                        />
                      )}
                      {index === currentStep && !task.completed && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2  bg-transparent rounded-full">
                          <div className="w-2 h-2 bg-transparent rounded-full  absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <g clip-path="url(#clip0_8394_25536)">
                                <path
                                  d="M6.57144 11.9999C6.48003 11.9996 6.38965 11.9806 6.30593 11.9439C6.22221 11.9072 6.14693 11.8536 6.08477 11.7866L2.84477 8.33994C2.72366 8.21087 2.65877 8.03897 2.6644 7.86206C2.67003 7.68515 2.7457 7.51772 2.87477 7.39661C3.00384 7.27549 3.17574 7.21061 3.35265 7.21624C3.52956 7.22186 3.69699 7.29754 3.8181 7.42661L6.56477 10.3533L12.1714 4.21994C12.2283 4.14909 12.2991 4.09062 12.3794 4.04812C12.4598 4.00562 12.5479 3.97998 12.6385 3.97279C12.7291 3.9656 12.8202 3.97701 12.9062 4.00631C12.9922 4.03561 13.0713 4.08218 13.1387 4.14317C13.2061 4.20416 13.2602 4.27828 13.2979 4.36097C13.3356 4.44366 13.356 4.53318 13.3578 4.62403C13.3596 4.71488 13.3428 4.80515 13.3085 4.88928C13.2741 4.97341 13.223 5.04964 13.1581 5.11327L7.06477 11.7799C7.0032 11.8482 6.92818 11.9029 6.84443 11.9408C6.76068 11.9787 6.67001 11.9988 6.5781 11.9999H6.57144Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_8394_25536">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        handleTaskClick(task.id, index, task.completed)
                      }
                      className={`w-full text-left border border-[#504999]  rounded-[100px] py-4 px-5 font-medium transition-all duration-200 hover:shadow-md ${
                        task.completed
                          ? "bg-[#F6F8FE] text-[#717171] opacity-75 line-through"
                          : index === currentStep
                          ? "bg-[#F0F9FF] text-[#4ECDC4] border-[#4ECDC4] cursor-pointer"
                          : "bg-[#F6F8FE] text-[#717171] opacity-50 cursor-not-allowed"
                      }`}
                      disabled={index !== currentStep || isPending}
                    >
                      {task.title}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=" my-4  text-center text-[#717171] font-medium">
              <p className="text-xl">No tasks available for this week.</p>

              <Link to="/dashboard/weekly-task">
                <Button className="mt-4 bg-gradient-to-r from-primary to-secondary w-full rounded-[60px] py-5 text-white text-base lg:text-md">
                  Add New Task +
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stepper;
