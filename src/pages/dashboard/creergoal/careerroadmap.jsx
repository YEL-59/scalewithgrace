import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const roadmapData = [
  {
    title: "Become a product manager",
    goals: [
      {
        week: "Week 1",
        title: "Research the Role of Product Manager",
        description:
          "Spend time researching what a product manager does, the skills required, and the career path.",
      },
      {
        week: "Week 2",
        title: "Develop Understanding of the Industry",
        description:
          "Gain knowledge about the industry you wish to work in and identify key companies and products.",
      },
      {
        week: "Week 3",
        title: "Identify Key Skills and Competencies",
        description:
          "List out and assess the key skills needed for product management and where your current skills match up.",
      },
      {
        week: "Week 4",
        title: "Enroll in a Product Management Course",
        description:
          "Choose and enroll in an introductory course or product management to build foundational skills.",
      },
      {
        week: "Week 5",
        title: "Develop Essential Skills",
        description:
          "Start practicing essential skills such as market research, wireframing, and product roadmapping.",
      },
    ],
  },
];

export default function CareerRoadmap() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [completedGoals, setCompletedGoals] = useState([]);

  const handleCheckboxChange = (index) => {
    setCompletedGoals((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const selectedGoals = roadmapData[selectedPlan].goals;
  const roadmapProgress = Math.round((selectedGoals.length / 5) * 100);
  const skillsAcquired = Math.round(
    (completedGoals.length / selectedGoals.length) * 100
  );

  return (
    <div className="p-6 md:flex gap-8">
      <div className="md:w-1/3 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Career Roadmaps</h2>
        <div className="space-y-2">
          {roadmapData.map((plan, i) => (
            <Button
              key={i}
              variant={selectedPlan === i ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                setSelectedPlan(i);
                setCompletedGoals([]);
              }}
            >
              {plan.title}
            </Button>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-sm text-muted-foreground">
            Goal Progress
          </h4>
          <p className="text-sm mt-2">Roadmap Progress</p>
          <Progress value={roadmapProgress} className="h-2" />
          <p className="text-sm mt-4">Skills Acquired</p>
          <Progress value={skillsAcquired} className="h-2" />
        </div>
      </div>

      <div className="md:w-2/3 space-y-4 mt-6 md:mt-0">
        <h2 className="text-xl font-bold">Your Progress</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Become a product manager design training course.
        </p>
        {selectedGoals.map((goal, i) => (
          <Card
            key={i}
            className={cn(
              "w-full",
              i === 1 &&
                "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white"
            )}
          >
            <CardContent className="p-4 flex items-start gap-3">
              <Checkbox
                checked={completedGoals.includes(i)}
                onCheckedChange={() => handleCheckboxChange(i)}
              />
              <div>
                <p className="font-semibold text-sm mb-1">{goal.week}</p>
                <h4 className="text-lg font-semibold leading-tight mb-1">
                  {goal.title}
                </h4>
                <p className="text-sm text-muted-foreground dark:text-gray-200">
                  {goal.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
