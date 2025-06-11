import React, { useState } from 'react';
import { Check } from 'lucide-react';

function Stepper() {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Update LinkedIn Profile', completed: false },
        { id: 2, title: 'Complete Online Course', completed: false },
        { id: 3, title: 'Attend industry event', completed: false },
        { id: 4, title: 'Add New Goal', completed: false, isSpecial: true }
    ]);

    const [currentStep, setCurrentStep] = useState(0);

    const handleTaskClick = (index) => {
        // If clicking on current step, move to next step and mark current as completed
        if (index === currentStep) {
            setTasks(prevTasks =>
                prevTasks.map((task, i) =>
                    i === index ? { ...task, completed: true } : task
                )
            );

            // Move to next step if not at the end
            if (currentStep < tasks.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const completedTasks = tasks.filter(task => task.completed).length;
    //   const progressPercentage = (completedTasks / tasks.length) * 100;

    return (
        <div className=" bg-gray-50 p-3">
            <div className="col-span-1 lg:col-span-2">
                {/* <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-medium text-[#191919]">This Week's Tasks</h3>
          <p className="text-[#717171] text-base md:text-lg lg:text-xl xl:text-2xl my-3">Let's take the next step.</p> */}

                <div className="shadow-lg my-4 rounded-[36px] p-11 bg-white space-y-6 text-[#717171] font-medium relative">
                    {/* Full Height Vertical Line */}
                    <div className="absolute left-[54px] top-[44px] bottom-[44px] w-0.5 bg-[#E9E9EA]">
                        {/* Progress Line */}
                        <div
                            className="w-full bg-[#4ECDC4] transition-all duration-500 ease-out"
                            style={{
                                height: `${(currentStep / (tasks.length - 1)) * 100}%`
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
                                            fill={task.completed ? '#4ECDC4' : index === currentStep ? '#4ECDC4' : 'white'}
                                            stroke={task.completed ? '#4ECDC4' : index === currentStep ? '#4ECDC4' : '#E9E9EA'}
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
                                    className={`w-full text-center border border-[#E9E9EA] rounded-[100px] py-4 px-5 font-medium transition-all duration-200 hover:shadow-md ${task.isSpecial
                                            ? 'bg-gradient-to-r from-[#4ECDC4] to-[#6A5ACD] text-white hover:from-[#45b8b0] hover:to-[#5a4fb8]'
                                            : task.completed
                                                ? 'bg-[#F6F8FE] text-[#717171] opacity-75'
                                                : index === currentStep
                                                    ? 'bg-[#F0F9FF] text-[#4ECDC4] border-[#4ECDC4] cursor-pointer'
                                                    : 'bg-[#F6F8FE] text-[#717171] opacity-50 cursor-not-allowed'
                                        } ${task.completed ? 'line-through' : ''}`}
                                    disabled={index !== currentStep}
                                >
                                    {task.title}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Completion Message */}
                {completedTasks === tasks.length && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-[#4ECDC4] to-[#6A5ACD] rounded-[36px] text-white text-center animate-fade-in">
                        <h4 className="text-xl font-semibold mb-2">🎉 Congratulations!</h4>
                        <p className="text-lg">You've completed all your tasks for this week!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Stepper;