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

export default function CareerRoadmap() {
  const navigate = useNavigate();
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null);
  const [completedWeeks, setCompletedWeeks] = useState([]);

  const { data: goals, isLoading, isError } = useGetCareerGoals();
  const { data: goalData } = useCareerGoalDetails(selectedRoadmapId);
  const { mutate: completeWeek } = useWeekTaskComplete(completedWeeks);

  useEffect(() => {
    setCompletedWeeks([]);
  }, [selectedRoadmapId]);
  useEffect(() => {
    if (goals && goals.length > 0 && !selectedRoadmapId) {
      setSelectedRoadmapId(goals[0].id);
    }
  }, [goals, selectedRoadmapId]);

  useEffect(() => {
    if (goalData?.weeks) {
      const backendCompleted = goalData.weeks
        .filter((week) => week.status === "completed")
        .map((week) => week.id);
      setCompletedWeeks(backendCompleted);
    }
  }, [goalData]);

  const handleWeekToggle = (week) => {
    const weekId = week.id;
    setCompletedWeeks((prev) =>
      prev.includes(weekId)
        ? prev.filter((id) => id !== weekId)
        : [...prev, weekId]
    );
    completeWeek(weekId);
  };

  const selectedWeeks = goalData?.weeks || [];
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

        {/* Right: Weekly Goals */}
        <div className="md:w-2/3 space-y-6 mt-6 md:mt-0">
          <h2 className="text-xl font-bold">Weekly Goals</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Click on each step to mark it as completed.
          </p>

          <div className="relative pl-5">
            {/* vertical line */}
            <div className="absolute left-[30px] top-[18px] bottom-0 w-px bg-muted-foreground/30 z-0" />

            <div className="flex flex-col gap-8 relative z-10">
              {selectedWeeks.map((week, index) => {
                const isCompleted = completedWeeks.includes(week.id);
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
                        onCheckedChange={() => handleWeekToggle(week)}
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
