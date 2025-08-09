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
import { Loader2, Sparkles } from "lucide-react";
import { useResumeBuilderSummeryText } from "@/hooks/resumebuild.hook";
import { FormProvider } from "react-hook-form";
import { usePageMeta } from "@/hooks/usePageMeta.hook";
import { useState } from "react";
import GradientButton from "@/components/shared/GradientButton";

const ResumeBuilder = () => {
  const { form, mutate, isPending } = useResumeBuilderSummeryText();

  const onSubmit = (values) => {
    mutate(values); // ✅ trigger API call
  };

  usePageMeta({
    title: "ResumeBuilder – Karially",
    description: "Create and customize your resume with Karially.",
  });

  const samplePrompts = [
    "Help me create a career goal in AI as an AI Developer, focusing on learning Machine Learning, Natural Language Processing, and Python over the next 1-2 years, with short-term, mid-term, and long-term milestones, resources to learn, and potential challenges to overcome",
    "Managed a portfolio of 12 enterprise clients, delivering tailored marketing strategies that boosted client retention by 28%.",
    "Designed and implemented a machine learning model that reduced fraud detection time by 40%, saving the company $1.2M annually.",
    "Directed end-to-end development of a fintech mobile application, achieving a 4.8-star rating from 50k+ users within the first 6 months.",
  ];

  const [promptIndex, setPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const handleSamplePrompt = () => {
    if (isTyping) return; // Prevent spamming during typing

    const prompt = samplePrompts[promptIndex];
    setPromptIndex((prev) => (prev + 1) % samplePrompts.length);

    // Clear textarea before typing
    form.setValue("prompt_text", "");
    setIsTyping(true);

    let charIndex = 0;

    const typeChar = () => {
      if (charIndex <= prompt.length) {
        form.setValue("prompt_text", prompt.slice(0, charIndex));
        charIndex++;
        setTimeout(typeChar, 20); // typing speed in ms
      } else {
        setIsTyping(false);
      }
    };

    typeChar();
  };

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
                  <FormLabel className="text-[#020817] text-lg font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Let AI do the work!
                  </FormLabel>
                  <FormLabel className="text-[#4B5563] text-base max-w-xl font-poppins font-normal">
                    <div className="bg-[#F3F4F6] text-sm text-[#4B5563] p-3 mt-4 rounded-md max-w-xl mx-auto">
                      💡 <strong>Tip:</strong> Be specific about your
                      achievements, metrics, and impact. This helps AI generate
                      a compelling and results-oriented summary.
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter prompt or notes…"
                      className="bg-[#fff] p-4 rounded-lg w-full focus-visible:ring-0 shadow-none mt-2 min-h-[120px] placeholder:text-base font-poppins"
                      {...field}
                      readOnly={isTyping} // prevent user typing during animation
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4 mt-6">
              <GradientButton
                label={isTyping ? "Typing..." : "Sample Prompt"}
                variant="primary"
                size="md"
                onClick={handleSamplePrompt}
                disabled={isTyping}
              />

              <button
                type="submit"
                variant="primary"
                className={`px-6 py-3 rounded-full text-white font-poppins cursor-pointer
      transition-all duration-300 ease-in-out
      hover:scale-105 hover:shadow-lg hover:shadow-green-300/50
      active:scale-95
      bg-gradient-to-r from-[#504999] to-[#44a199]
      disabled:opacity-70 disabled:cursor-not-allowed`}
                disabled={isPending || isTyping}
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </div>
                ) : (
                  "Generate Resume"
                )}
              </button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default ResumeBuilder;
