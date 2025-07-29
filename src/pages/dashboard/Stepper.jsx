import React, { useEffect, useState } from "react";

import { Check } from "lucide-react";
import { useGetDashboard } from "@/hooks/subscription.hook";

function Stepper() {
  const { data: dashboard } = useGetDashboard();
  const weeklyPlan = dashboard?.running_weekly_tasks?.[0]; // First weekly plan
  const weeklyTasks = weeklyPlan?.weekly_tasks ?? [];

  const [tasks, setTasks] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (weeklyTasks.length > 0) {
      setTasks(
        weeklyTasks.map((task) => ({
          id: task.id,
          title: task.title,
          completed: task.is_completed,
        }))
      );
    }
  }, [weeklyTasks]);

  const handleTaskClick = (index) => {
    if (index === currentStep) {
      setTasks((prevTasks) =>
        prevTasks.map((task, i) =>
          i === index ? { ...task, completed: true } : task
        )
      );
      if (currentStep < tasks.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="bg-gray-50 p-3">
      <div className="col-span-1 lg:col-span-2">
        {weeklyPlan && (
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#191919]">
              Week {weeklyPlan.week_number}: {weeklyPlan.title}
            </h3>
            <p className="text-[#717171] text-base md:text-lg lg:text-xl mt-2">
              {weeklyPlan.description}
            </p>
          </div>
        )}

        <div className="shadow-lg my-4 rounded-[36px] p-11 bg-white space-y-6 text-[#717171] font-medium relative">
          {/* Vertical Line */}
          <div className="absolute left-[54px] top-[44px] bottom-[44px] w-0.5 bg-[#E9E9EA]">
            <div
              className="w-full bg-[#4ECDC4] transition-all duration-500 ease-out"
              style={{
                height: `${(currentStep / (tasks.length - 1)) * 100}%`,
              }}
            />
          </div>

          {tasks.length > 0 ? (
            <div className="shadow-lg my-4 rounded-[36px] p-11 bg-white space-y-6 text-[#717171] font-medium relative">
              {/* Vertical Line */}
              <div className="absolute left-[54px] top-[44px] bottom-[44px] w-0.5 bg-[#E9E9EA]">
                <div
                  className="w-full bg-[#4ECDC4] transition-all duration-500 ease-out"
                  style={{
                    height: `${(currentStep / (tasks.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {tasks.map((task, index) => (
                <div key={task.id} className="relative">
                  <div className="flex items-center gap-4">
                    <div className="relative z-10 bg-white">
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
                              ? "#4ECDC4"
                              : index === currentStep
                              ? "#4ECDC4"
                              : "white"
                          }
                          stroke={
                            task.completed
                              ? "#4ECDC4"
                              : index === currentStep
                              ? "#4ECDC4"
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
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>

                    <button
                      onClick={() => handleTaskClick(index)}
                      className={`w-full text-left border border-[#E9E9EA] rounded-[100px] py-4 px-5 font-medium transition-all duration-200 hover:shadow-md ${
                        task.completed
                          ? "bg-[#F6F8FE] text-[#717171] opacity-75 line-through"
                          : index === currentStep
                          ? "bg-[#F0F9FF] text-[#4ECDC4] border-[#4ECDC4] cursor-pointer"
                          : "bg-[#F6F8FE] text-[#717171] opacity-50 cursor-not-allowed"
                      }`}
                      disabled={index !== currentStep}
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
            </div>
          )}
        </div>

        {/* Completion Message */}
        {tasks.length > 0 && completedTasks === tasks.length && (
          <div className="mt-6 p-6 bg-gradient-to-r from-[#4ECDC4] to-[#6A5ACD] rounded-[36px] text-white text-center animate-fade-in">
            <h4 className="text-xl font-semibold mb-2">🎉 Congratulations!</h4>
            <p className="text-lg">
              You've completed all your tasks for this week!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stepper;
