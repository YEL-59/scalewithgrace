import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useWeeklyCareerGoalSet } from "@/hooks/weekly-task.hook";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { usePageMeta } from "@/hooks/usePageMeta.hook";

const WeeklyTask = () => {
  const navigate = useNavigate();
  const { form, mutate, isPending } = useWeeklyCareerGoalSet((id) => {
    navigate(`/dashboard/task-manager/${id}`);
  });

  const onSubmit = (values) => {
    mutate(values);
  };
  usePageMeta({
    title: "Weekly Task – Karially",
    description: "Manage your weekly tasks on Karially.",
  });
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      <div className="max-w-7xl mx-auto text-center md:text-left mb-10">
        <h1 className="text-[#191919] text-3xl md:text-5xl font-semibold">
          Add New Weekly Task
        </h1>
        <p className="text-[#717171] text-lg md:text-xl mt-4">
          Let’s take the next step in your career today
        </p>
      </div>
      {isPending && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-7xl mx-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roadmap Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter task title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter task description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 mt-6 ">
            <Button
              type="submit"
              className="px-6 py-5 rounded-full bg-secondary "
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Generate Weekly Task"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WeeklyTask;
