import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  useCareerGoalDetails,
  useGetCareerGoals,
  useWeekTaskComplete,
} from "@/hooks/career-goal.hook";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export default function CareerRoadmap() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Track which roadmap is selected
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null);

  // Track locally completed weeks for the current roadmap
  const [completedWeeks, setCompletedWeeks] = useState([]);

  const { data: goals, isLoading, isError } = useGetCareerGoals(); // Fetch all roadmaps
  const { data: goalData } = useCareerGoalDetails(selectedRoadmapId); // Fetch selected roadmap details
  const { mutate: completeWeek } = useWeekTaskComplete(completedWeeks); // API to mark week as complete

  // Reset completed weeks when switching roadmap
  useEffect(() => {
    setCompletedWeeks([]);
  }, [selectedRoadmapId]);

  // Auto-select the first roadmap if none is selected
  useEffect(() => {
    if (goals && goals.length > 0 && !selectedRoadmapId) {
      setSelectedRoadmapId(goals[0].id);
    }
  }, [goals, selectedRoadmapId]);

  // Sync local completed weeks with backend data
  useEffect(() => {
    if (goalData?.weeks) {
      const backendCompleted = goalData.weeks
        .filter((week) => week.status === "completed")
        .map((week) => week.id);
      setCompletedWeeks(backendCompleted);
    }
  }, [goalData]);

  // Handle completing a week (checkbox click)
  // const handleWeekToggle = (week) => {
  //   const weekId = week.id;
  //   const isCompleted = completedWeeks.includes(weekId);

  //   // 1️⃣ Local optimistic update
  //   const newCompletedWeeks = isCompleted
  //     ? completedWeeks.filter((id) => id !== weekId)
  //     : [...completedWeeks, weekId];

  //   setCompletedWeeks(newCompletedWeeks);

  //   // 2️⃣ Update the selected roadmap cache
  //   queryClient.setQueryData(["career-goal", selectedRoadmapId], (oldData) => {
  //     if (!oldData) return oldData;
  //     return {
  //       ...oldData,
  //       weeks: oldData.weeks.map((w) =>
  //         w.id === weekId
  //           ? { ...w, status: isCompleted ? "pending" : "completed" }
  //           : w
  //       ),
  //     };
  //   });

  //   // 3️⃣ Update the global goals list (for left-side badges)
  //   queryClient.setQueryData(["career-goals"], (oldGoals) => {
  //     if (!oldGoals) return oldGoals;

  //     return oldGoals.map((goal) => {
  //       if (goal.id === selectedRoadmapId) {
  //         const totalWeeks = goal.total_weeks || 0;
  //         const completed = newCompletedWeeks.length;
  //         const percentage = totalWeeks
  //           ? Math.round((completed / totalWeeks) * 100)
  //           : 0;

  //         return {
  //           ...goal,
  //           completed_weeks: completed,
  //           completion_percentage: percentage,
  //         };
  //       }
  //       return goal;
  //     });
  //   });

  //   // 4️⃣ Call API
  //   completeWeek(weekId);
  // };

  const handleWeekComplete = (week) => {
    const weekId = week.id;
    if (completedWeeks.includes(weekId)) return; // already completed, do nothing

    // 1️⃣ Local optimistic update
    const newCompletedWeeks = [...completedWeeks, weekId];
    setCompletedWeeks(newCompletedWeeks);

    // 2️⃣ Update the selected roadmap cache
    queryClient.setQueryData(["career-goal", selectedRoadmapId], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        weeks: oldData.weeks.map((w) =>
          w.id === weekId ? { ...w, status: "completed" } : w
        ),
      };
    });

    // 3️⃣ Update the global goals list (for left-side badges)
    queryClient.setQueryData(["career-goals"], (oldGoals) => {
      if (!oldGoals) return oldGoals;

      return oldGoals.map((goal) => {
        if (goal.id === selectedRoadmapId) {
          const totalWeeks = goal.total_weeks || 0;
          const completed = newCompletedWeeks.length;
          const percentage = totalWeeks
            ? Math.round((completed / totalWeeks) * 100)
            : 0;

          return {
            ...goal,
            completed_weeks: completed,
            completion_percentage: percentage,
          };
        }
        return goal;
      });
    });

    // 4️⃣ Call API to mark as completed
    completeWeek(weekId);
  };

  // Get weeks of selected roadmap
  const selectedWeeks = goalData?.weeks || [];
  // Calculate overall progress %
  const progressPercent =
    selectedWeeks.length > 0
      ? Math.round((completedWeeks.length / selectedWeeks.length) * 100)
      : 0;

  if (isLoading) return <p className="p-4">Loading goals...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load goals.</p>;

  return (
    <div className="p-6 ">
      <div className="w-full flex justify-between">
        <div>
          {/* ---------- Left: Roadmap List ---------- */}
          <h1 className="text-[#020817] font-poppins text-2xl font-bold leading-none">
            Career Roadmap
          </h1>
          <p className="text-xs font-poppins font-normal text-[#504999]">
            Become a product manager
          </p>
        </div>
        <div>
          <Button
            className="bg-gradient-to-r from-primary to-secondary"
            onClick={() => navigate("/dashboard/career-goal")}
          >
            Add New Plan +
          </Button>
        </div>
      </div>
      <div className="flex gap-8 pt-5">
        {/* Left: Roadmap List */}
        <div className="md:w-1/3 space-y-4">
          <div className="space-y-2 bg-white rounded-md p-5 shadow">
            <h2 className="text-xl font-bold text-gray-800 text-center border-b-2 pb-2">
              Career Roadmaps
            </h2>
            {goals.map((goal) => {
              const isSelected = selectedRoadmapId === goal.id;

              return (
                <Button
                  key={goal.id}
                  variant="outline"
                  className={cn(
                    "w-full justify-between px-4 py-6 transition-colors duration-200 border",
                    isSelected
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "bg-white/10 text-black"
                  )}
                  onClick={() => setSelectedRoadmapId(goal.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => setSelectedRoadmapId(goal.id)}
                    />
                    <span className="text-left">{goal.roadmap_name}</span>
                  </div>
                  <Badge className="text-xs px-2 py-1 bg-blue-100 text-blue-800">
                    {goal.completion_percentage}%
                  </Badge>
                </Button>
              );
            })}
          </div>
          {/* Progress Card for selected roadmap */}
          {selectedWeeks.length > 0 && (
            <div className="bg-white rounded-md p-5 shadow">
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                Your Progress
              </h4>
              <p className="text-sm mb-1">Overall Completion</p>
              <Progress value={progressPercent} className="h-2 mb-2" />
              <p className="text-xs text-gray-600">
                {completedWeeks.length} of {selectedWeeks.length} steps
                completed
              </p>
            </div>
          )}
        </div>

        {/* ---------- Right: Weekly Goals (Stepper) ---------- */}
        <div className="md:w-2/3 space-y-6 mt-6 md:mt-0">
          <h2 className="text-xl font-bold">Weekly Goals</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Click on each step to mark it as completed.
          </p>

          <div className="relative pl-5">
            {/* Vertical line for stepper */}
            {/* Full Vertical Line */}
            <div className="absolute left-7 top-5 bottom-0 w-1 bg-gray-200 rounded-full z-0" />

            {/* Gradient Fill */}
            <div
              className="absolute left-7 top-5 w-1 rounded-full bg-gradient-to-b from-purple-500 to-teal-400 transition-all duration-700 z-0"
              style={{
                height: `${
                  selectedWeeks.length
                    ? (completedWeeks.length / selectedWeeks.length) * 100
                    : 0
                }%`,
              }}
            />

            <div className="flex flex-col gap-8 relative z-10">
              {selectedWeeks.map((week, index) => {
                const isCompleted = completedWeeks.includes(week.id);
                // Highlight the next incomplete week
                const nextIncompleteIndex = selectedWeeks.findIndex(
                  (w) => !completedWeeks.includes(w.id)
                );
                const isActive = index === nextIncompleteIndex;

                return (
                  <div
                    key={week.id}
                    className="relative flex items-start gap-4 pl-6"
                  >
                    <div className="absolute left-0 top-1.5 z-10">
                      <Checkbox
                        checked={isCompleted}
                        disabled={isCompleted} // ✅ once completed, can't uncheck
                        onCheckedChange={() => handleWeekComplete(week)}
                        className="w-5 h-5 data-[state=checked]:bg-primary rounded border-muted-foreground"
                      />
                    </div>

                    <Card
                      className={cn(
                        "w-full px-6  rounded-xl shadow-sm transition-colors",
                        isCompleted
                          ? "bg-gradient-to-r from-primary to-secondary text-white"
                          : "bg-white"
                      )}
                    >
                      <div>
                        <span
                          className={`text-sm font-medium ${
                            isActive ? "text-primary" : ""
                          }`}
                        >
                          Week {index + 1}
                        </span>
                        <h4
                          className={cn(
                            "text-lg font-semibold ",
                            isCompleted
                              ? "text-white"
                              : "text-gray-800 dark:text-gray-100"
                          )}
                        >
                          {week.title}
                        </h4>
                        <p
                          className={cn(
                            "text-sm",
                            isCompleted
                              ? "text-white/80"
                              : "text-muted-foreground dark:text-gray-300"
                          )}
                        >
                          {week.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
