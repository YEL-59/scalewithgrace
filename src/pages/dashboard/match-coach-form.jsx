import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown, CheckCircle2 } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  navigating: z.string().min(1, "Select one"),
  helpWith: z.string().min(1, "Select one"),
  currentRole: z.string(),
  goal: z.string(),
  availability: z.string(),
  message: z.string().optional(),
});

export default function MatchCoachForm() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availability: "flexible",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setOpen(false);
    setShowSuccess(true);
    reset();
  };

  return (
    <>
      {/* Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-[#1B1F25] py-4 px-[22px] border border-[#1B1F25] rounded-[100px] mt-10"
          >
            Let’s match you with the right coach
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Let’s match you with the right coach to support your next move.
            </DialogTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Answer a few quick questions so we can understand where you are
              and how we can help. You’ll hear back from us within 24 hours.
            </p>
          </DialogHeader>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div>
              <Label htmlFor="name">What’s your name?</Label>
              <Input {...register("name")} placeholder="Enter your name" />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")} placeholder="Enter your email" />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Navigating */}
            <div>
              <Label>What are you currently navigating in your career?</Label>
              <Controller
                control={control}
                name="navigating"
                render={({ field }) => (
                  <div className="relative">
                    <select
                      {...field}
                      className="w-full p-3 border rounded-md appearance-none pr-10"
                    >
                      <option value="">Please select</option>
                      <option value="job-search">Job Search</option>
                      <option value="career-transition">
                        Career Transition
                      </option>
                      <option value="promotion">Promotion</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                )}
              />
              {errors.navigating && (
                <p className="text-sm text-red-500">
                  {errors.navigating.message}
                </p>
              )}
            </div>

            {/* Help With */}
            <div>
              <Label>What do you want help with during your session?</Label>
              <Controller
                control={control}
                name="helpWith"
                render={({ field }) => (
                  <div className="relative">
                    <select
                      {...field}
                      className="w-full p-3 border rounded-md appearance-none pr-10"
                    >
                      <option value="">Please select</option>
                      <option value="resume">Resume review</option>
                      <option value="interview">Interview prep</option>
                      <option value="advice">Career advice</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                  </div>
                )}
              />
              {errors.helpWith && (
                <p className="text-sm text-red-500">
                  {errors.helpWith.message}
                </p>
              )}
            </div>

            {/* Current Role */}
            <div>
              <Label>What’s your current role or most recent job title?</Label>
              <Input {...register("currentRole")} placeholder="Write here..." />
            </div>

            {/* Career Goal */}
            <div>
              <Label>What’s your career goal or ideal next move?</Label>
              <Input {...register("goal")} placeholder="Write here..." />
            </div>

            {/* Availability */}
            <div>
              <Label>What days/times generally work best for you?</Label>
              <Controller
                control={control}
                name="availability"
                render={({ field }) => (
                  <RadioGroup {...field} defaultValue="flexible">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="morning" id="morning" />
                        <Label htmlFor="morning">Weekdays (9AM–12PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="afternoon" id="afternoon" />
                        <Label htmlFor="afternoon">Weekdays (12PM–5PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="evenings" id="evenings" />
                        <Label htmlFor="evenings">Evenings or weekends</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flexible" id="flexible" />
                        <Label htmlFor="flexible">
                          I’m flexible / Just match me
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            {/* Message */}
            <div>
              <Label>Is there anything else you’d like us to know?</Label>
              <Textarea {...register("message")} placeholder="Write here..." />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md rounded-2xl text-center ">
          <div className="flex flex-col items-center h-12 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="143"
              height="144"
              viewBox="0 0 143 144"
              fill="none"
            >
              <path
                d="M71.1542 137.178C107.343 137.178 136.679 107.841 136.679 71.6527C136.679 35.4641 107.343 6.12744 71.1542 6.12744C34.9656 6.12744 5.62891 35.4641 5.62891 71.6527C5.62891 107.841 34.9656 137.178 71.1542 137.178Z"
                fill="#1B5661"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M45.0127 67.0426C43.8434 66.259 42.4343 65.915 41.0354 66.0715C39.6365 66.228 38.3383 66.8749 37.371 67.8975C36.4038 68.9201 35.83 70.2523 35.7515 71.6577C35.673 73.0631 36.0948 74.4509 36.9421 75.5749L54.8171 99.4082C55.3501 100.117 56.0343 100.698 56.8201 101.109C57.6058 101.52 58.4733 101.75 59.3594 101.784C60.2454 101.817 61.1278 101.652 61.9422 101.302C62.7567 100.951 63.4827 100.423 64.0674 99.7568L105.776 52.0901C106.771 50.9569 107.3 49.4883 107.255 47.9807C107.21 46.4731 106.595 45.0386 105.534 43.9666C104.473 42.8946 103.045 42.2649 101.538 42.2045C100.031 42.1441 98.5567 42.6575 97.4133 43.6412L59.1339 76.4538L45.0127 67.0426Z"
                fill="#FAFAFA"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold">Thanks for sharing!</h2>
          <p className="text-sm text-muted-foreground">
            We’ll review your responses and match you with a coach that aligns
            with your goals. Keep an eye on your inbox, you’ll receive an email
            from us within 24 hours with your coach and scheduling link.
          </p>
          <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
            Back to Home
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
