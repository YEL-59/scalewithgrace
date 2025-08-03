import React, { useState, useEffect } from "react";
import {
  Target,
  BookOpen,
  Users,
  TrendingUp,
  Lock,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const ProgressTracker = ({ currentStage, overallProgress, allgoals }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  console.log("allgoals", allgoals);
  // Map stages with proper status
  const stages = allgoals.map((goal) => {
    let status = "in_progress"; // default
    if (goal.status === "completed") status = "complete";
    if (goal.id === currentStage) status = "active"; // active first in_progress
    return {
      id: goal.id,
      title: goal.roadmap_name,
      status,
      description: goal.description || "",
    };
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(overallProgress);
    }, 500);
    return () => clearTimeout(timer);
  }, [overallProgress]);

  const getStageIconBackground = (status) => {
    switch (status) {
      case "complete":
        return "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-600";
      case "active":
        return "bg-gradient-to-r from-purple-100 to-teal-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-400";
    }
  };

  const getStageTextColor = (status) => {
    switch (status) {
      case "complete":
        return "text-emerald-600";
      case "active":
        return "text-purple-600";
      default:
        return "text-gray-400";
    }
  };

  const currentStageInfo = stages.find((stage) => stage.status === "active");

  // const getCurrentStageInfo = () => {
  //   const current = stages.find((stage) => stage.status === "active");
  //   return current || stages[currentStage - 1];
  // };

  const navigate = useNavigate();

  const handleGoalClick = () => {
    navigate(`/dashboard/career-road-map`);
  };
  return (
    <div className="bg-white my-9 mb-9 rounded-4xl p-6 shadow-sm container mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[#0A0A0A] text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
          Your Progress
        </h2>
        <p className="text-[#737373] text-sm">
          Track your journey through the {stages.length} stages
        </p>
      </div>
      {allgoals.length > 0 ? (
        <>
          {" "}
          {/* Current Stage Info */}
          <div className="flex items-center gap-6 mb-8 p-6 bg-gradient-to-r from-purple-50 to-teal-50 rounded-2xl border border-purple-100">
            <svg
              className="bg-[#DCDBEB] rounded-full p-3 size-12"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="url(#paint0_linear_8836_6855)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                stroke="url(#paint1_linear_8836_6855)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                stroke="url(#paint2_linear_8836_6855)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_8836_6855"
                  x1="26.6124"
                  y1="12.0412"
                  x2="-0.69081"
                  y2="13.3849"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_8836_6855"
                  x1="20.7674"
                  y1="12.0247"
                  x2="4.38551"
                  y2="12.831"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_8836_6855"
                  x1="14.9225"
                  y1="12.0082"
                  x2="9.46184"
                  y2="12.277"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#504999" />
                  <stop offset="1" stop-color="#44A199" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {currentStageInfo?.description ||
                  "Goal Setting & Strategy Development"}
              </h3>
              <p className="text-gray-600">
                Stage {currentStage} of {stages.length} • {overallProgress}%
                Complete
              </p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm font-semibold text-purple-600">
                {overallProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-teal-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
          </div>
          {/* Stages Grid */}
          <div className="h-[150px] xl:h-[180px] 2xl:h-auto">
            <div className="flex absolute 2xl:static overflow-x-scroll max-w-full">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  onClick={() => handleGoalClick(stage.id)}
                  className={`
              flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer
              ${
                stage.status === "active"
                  ? "bg-gradient-to-b from-purple-50 to-teal-50 border-2 border-purple-200"
                  : "hover:bg-gray-50"
              }
            `}
                >
                  {/* Stage Icon */}
                  <div
                    className={`
              w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300
           
               ${getStageIconBackground(stage.status)}
                    ${stage.status === "in_progress" ? "" : "shadow-sm"}
            `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_8836_6868)">
                        <path
                          d="M11.9953 4.55598C11.5107 4.42316 11.0076 4.35582 10.5 4.35582C7.38777 4.35582 4.85582 6.88777 4.85582 10C4.85582 13.1122 7.38777 15.6442 10.5 15.6442C13.6122 15.6442 16.1442 13.1122 16.1442 10C16.1442 9.49238 16.0768 8.9893 15.944 8.50473C15.8528 8.17184 16.0487 7.82801 16.3816 7.73676C16.7143 7.64555 17.0583 7.84141 17.1495 8.1743C17.3122 8.76921 17.3945 9.38324 17.3942 10C17.3942 13.8014 14.3014 16.8942 10.5 16.8942C6.69855 16.8942 3.60582 13.8014 3.60582 10C3.60582 6.19855 6.69855 3.10582 10.5 3.10582C11.1193 3.10582 11.7335 3.18813 12.3257 3.35047C12.6033 3.42656 12.7857 3.67836 12.7856 3.95297C12.7856 4.00888 12.7781 4.06453 12.7632 4.11844C12.672 4.45133 12.3282 4.64734 11.9953 4.55598ZM19.3132 6.73594C18.9822 6.83395 18.7933 7.18164 18.8913 7.51266C19.1293 8.31656 19.25 9.1534 19.25 10C19.25 14.8248 15.3248 18.75 10.5 18.75C5.67523 18.75 1.75 14.8248 1.75 10C1.75 5.17523 5.67523 1.25 10.5 1.25C11.3466 1.25 12.1835 1.37066 12.9872 1.60863C13.3182 1.70668 13.6659 1.5177 13.7639 1.18676C13.7814 1.12758 13.7898 1.06793 13.7898 1.00922C13.7899 0.739492 13.6139 0.490547 13.3421 0.410039C12.423 0.13793 11.4668 0 10.5 0C7.82891 0 5.31766 1.0402 3.42891 2.92891C1.5402 4.8177 0.5 7.32891 0.5 10C0.5 12.6711 1.5402 15.1823 3.42891 17.0711C5.31762 18.9598 7.82891 20 10.5 20C13.1711 20 15.6823 18.9598 17.5711 17.0711C19.4598 15.1823 20.5 12.6711 20.5 10C20.5 9.03324 20.362 8.07699 20.0899 7.15781C19.992 6.82684 19.6441 6.63809 19.3132 6.73594ZM10.5 7.5C10.5919 7.5 10.6847 7.50508 10.7759 7.51508C11.1192 7.55285 11.4277 7.30508 11.4653 6.96199C11.503 6.61887 11.2554 6.3102 10.9122 6.27258C10.7753 6.25755 10.6377 6.25002 10.5 6.25C8.43223 6.25 6.75 7.93223 6.75 10C6.75 12.0678 8.43223 13.75 10.5 13.75C12.5678 13.75 14.25 12.0678 14.25 10C14.25 9.6548 13.9702 9.375 13.625 9.375C13.2798 9.375 13 9.6548 13 10C13 11.3785 11.8785 12.5 10.5 12.5C9.12148 12.5 8 11.3785 8 10C8 8.62148 9.12148 7.5 10.5 7.5ZM13.6912 5.92504L14.0025 2.80211C14.0168 2.65847 14.0804 2.52421 14.1825 2.42215L16.4216 0.183047C16.5061 0.0985983 16.613 0.0401192 16.7297 0.0145325C16.8463 -0.0110542 16.9679 -0.00267712 17.0799 0.038672C17.192 0.0800212 17.2899 0.152611 17.3619 0.247848C17.434 0.343085 17.4773 0.456982 17.4867 0.576055L17.6642 2.83582L19.9239 3.01332C20.043 3.02267 20.1569 3.06595 20.2522 3.13803C20.3474 3.21011 20.42 3.30797 20.4614 3.42003C20.5027 3.5321 20.5111 3.65366 20.4855 3.77033C20.4599 3.88701 20.4014 3.9939 20.317 4.07836L18.0778 6.31746C17.9758 6.41954 17.8415 6.48313 17.6979 6.49742L14.575 6.80891L10.942 10.442C10.884 10.5001 10.8151 10.5462 10.7392 10.5776C10.6634 10.609 10.5821 10.6251 10.5 10.625C10.4179 10.6251 10.3366 10.609 10.2608 10.5776C10.1849 10.5462 10.116 10.5001 10.0581 10.4419C9.81398 10.1979 9.81398 9.80211 10.0581 9.55805L13.6912 5.92504ZM14.9886 5.51148L17.3517 5.27578L18.4742 4.15332L17.034 4.0402C16.8856 4.02852 16.7463 3.96429 16.641 3.85904C16.5358 3.75379 16.4716 3.61444 16.4599 3.46605L16.3468 2.02578L15.2242 3.14828L14.9886 5.51148Z"
                          fill="#9351E8"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_8836_6868">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  {/* Stage Title */}
                  <h4
                    className={`
              text-xs font-normal truncate mb-1 transition-colors duration-300
              ${getStageTextColor(stage.status)}
            `}
                  >
                    {stage.title}
                  </h4>

                  {/* Stage Status */}
                  <p
                    className={`
              text-xs transition-colors duration-300
              ${
                stage.status === "complete"
                  ? "text-emerald-600"
                  : stage.status === "active"
                  ? "text-purple-600"
                  : "text-gray-400"
              }
              }
            `}
                  >
                    {stage.status === "complete"
                      ? "Complete"
                      : stage.status === "active"
                      ? "Active"
                      : "In Progress"}
                  </p>

                  {/* Stage Description */}
                  <p className="text-xs text-gray-500 mt-1 leading-tight">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="shadow-lg my-4 rounded-[36px] p-11 bg-white text-center text-[#717171] font-medium">
          <p className="text-xs">
            No tasks available for this week.{" "}
            <span>
              <Link to="/dashboard/career-goal">click here to add goal</Link>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
