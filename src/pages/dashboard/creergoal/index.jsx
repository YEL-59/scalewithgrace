import { useForm, FormProvider } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Navigate } from "react-router";
import { Links } from "react-router";

const CareerGoal = () => {
  const form = useForm({
    defaultValues: {
      roadmapName: "",
      weeks: 4,
      testArea: "",
    },
  });

  const onSubmit = (values) => {
    console.log("submit", values);
    // your generate logic here
  };

  const onRegenerate = () => {
    console.log("regenerate clicked");
    // your regenerate logic here
  };
  //   const onRoadmap = () => {
  //     const navigate = Navigate();
  //     navigate("/career-road-map");
  //   };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      {/* Header */}
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-7xl mx-auto"
        >
          {/* Roadmap Name */}
          <FormField
            control={form.control}
            name="roadmapName"
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
            name="weeks"
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
            name="testArea"
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
            <Link to="/dashboard/career-road-map">
              {" "}
              <Button
                type="submit"
                variant="primary"
                className="px-6 py-3 rounded-full"
                // onClick={onRoadmap()}
              >
                Generate Roadmap
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CareerGoal;
