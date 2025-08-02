import { FormProvider } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useCareerGoalSet } from "@/hooks/career-goal.hook";
import { Loader2 } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta.hook";

const CareerGoal = () => {
  const { form, mutate, isPending } = useCareerGoalSet();

  const onSubmit = (values) => {
    mutate(values); // ✅ trigger the mutation with form data
    console.log(values);
  };

  const onRegenerate = () => {
    console.log("regenerate clicked");
  };
  usePageMeta({
    title: "Career Goal – Karially",
    description: "Set and manage your career goals on Karially.",
  });
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      <div
        className="max-w-7xl mx-auto text-center md:text-left mb-10"
        data-aos="fade-up"
      >
        <h1 className="text-[#191919] font-poppins text-3xl md:text-5xl lg:text-[64px] font-semibold leading-tight max-w-5xl">
          Set your career goal
        </h1>
        <p className="text-[#717171] font-poppins text-lg md:text-xl lg:text-[24px] mt-4">
          Let’s take the next step in your career today
        </p>
      </div>
      {isPending && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      )}

      {/* ✅ Wrap with FormProvider */}
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-7xl mx-auto"
          >
            {/* Roadmap Name */}
            <FormField
              control={form.control}
              name="roadmap_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1E1E1E] text-[18px] font-normal">
                    Roadmap Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter roadmap name"
                      className="bg-[#fff] p-4 rounded-lg w-full focus-visible:ring-0 shadow-none mt-2 py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weeks Input */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1E1E1E] text-[18px] font-normal">
                    Weeks to plan
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={52}
                      placeholder="Number of weeks"
                      className="bg-[#fff] p-4 rounded-lg w-full focus-visible:ring-0 shadow-none mt-2 py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Test Area */}
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1E1E1E] text-[18px] font-normal">
                    Roadmap Generation Prompt
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter prompt or notes…"
                      className="bg-[#fff] p-4 rounded-lg w-full focus-visible:ring-0 shadow-none mt-2 min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={onRegenerate}
                className="px-6 py-3 rounded-full"
              >
                Regenerate
              </Button>

              <Button
                type="submit"
                variant="primary"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary"
                disabled={isPending}
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isPending ? "Submitting..." : "Generate Roadmap"}
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default CareerGoal;
