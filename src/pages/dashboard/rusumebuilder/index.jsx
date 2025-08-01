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

import { Loader2 } from "lucide-react";
import { useResumeBuilderSummeryText } from "@/hooks/resumebuild.hook";
import { FormProvider } from "react-hook-form";
import { usePageMeta } from "@/hooks/usePageMeta.hook";

const ResumeBuilder = () => {
  const { form, mutate, isPending } = useResumeBuilderSummeryText();

  const onSubmit = (values) => {
    mutate(values); // ✅ trigger API call
  };
  usePageMeta({
    title: "ResumeBuilder – Karially",
    description: "Create and customize your resume with Karially.",
  });
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      {/* Header */}
      <div
        className="max-w-7xl mx-auto text-center md:text-left mb-10"
        data-aos="fade-up"
      >
        <h1 className="text-[#191919] font-poppins text-3xl md:text-5xl lg:text-[64px] font-semibold leading-tight max-w-5xl">
          Build Your Professional Resume
        </h1>
        <p className="text-[#717171] font-poppins text-lg md:text-xl lg:text-[24px] mt-4">
          Let’s take the next step in your career today
        </p>
      </div>

      {/* Form */}
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-7xl mx-auto"
          >
            {/* Textarea for Prompt */}
            <FormField
              control={form.control}
              name="prompt_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1E1E1E] text-[18px] font-medium">
                    Let AI do the work!
                  </FormLabel>
                  <FormLabel className="text-[#1E1E1E] text-[12px] font-normal">
                    Describe your role in a few words, and we'll generate
                    tailored content for your work experience section.
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
                className="px-6 py-3 rounded-full"
                onClick={() => form.reset()}
              >
                Regenerate
              </Button>

              <Button
                type="submit"
                variant="primary"
                className="px-6 py-3 rounded-full"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Resume"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default ResumeBuilder;
