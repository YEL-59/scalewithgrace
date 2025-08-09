import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCoachMatch } from "@/hooks/coachingbooking.hook";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  navigating_career: z.string().min(1, "Select one"),
  session_help: z.string().min(1, "Select one"),
  current_role: z.string().optional(),
  career_goal: z.string().optional(),
  preferred_time: z.string().min(1, "Select one"),
  additional_info: z.string().optional(),
});

export default function MatchCoachForm() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      navigating_career: "",
      session_help: "",
      current_role: "",
      career_goal: "",
      preferred_time: "flexible",
      additional_info: "",
    },
  });

  const { mutate, isLoading } = useCoachMatch();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        setShowSuccess(true);
        form.reset();
      },
      onError: () => {
        toast.error("Submission failed. Please try again.");
      },
    });
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Navigating Career */}
              <FormField
                control={form.control}
                name="navigating_career"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What are you currently navigating in your career?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="I’m pivoting into a new industry">
                          I’m pivoting into a new industry
                        </SelectItem>
                        <SelectItem value="I’m reentering the workforce">
                          I’m reentering the workforce
                        </SelectItem>
                        <SelectItem value="I’m job hunting and applying actively">
                          I’m job hunting and applying actively
                        </SelectItem>
                        <SelectItem value="I want to grow in my current role">
                          I want to grow in my current role
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Session Help */}
              <FormField
                control={form.control}
                name="session_help"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What do you want help with during your session?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Resume review or creation">
                          Resume review or creation
                        </SelectItem>
                        <SelectItem value="Career strategy / planning">
                          Career strategy / planning
                        </SelectItem>
                        <SelectItem value="Interview prep">
                          Interview prep
                        </SelectItem>
                        <SelectItem value="LinkedIn optimization">
                          LinkedIn optimization
                        </SelectItem>
                        <SelectItem value="Cover letter support">
                          Cover letter support
                        </SelectItem>
                        <SelectItem value="Goal setting / weekly execution">
                          Goal setting / weekly execution
                        </SelectItem>
                        <SelectItem value="General career advice">
                          General career advice
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Current Role */}
              <FormField
                control={form.control}
                name="current_role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What’s your current role or most recent job title?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Write here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Career Goal */}
              <FormField
                control={form.control}
                name="career_goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What’s your career goal or ideal next move?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Write here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preferred Time */}
              <FormField
                control={form.control}
                name="preferred_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What days/times generally work best for you?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-4"
                      >
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
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Additional Info */}
              <FormField
                control={form.control}
                name="additional_info"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Is there anything else you’d like us to know?
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-secondary"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md rounded-2xl text-center ">
          <div className="flex flex-col items-center h-12 justify-center">
            {/* You can replace this svg with your CheckCircle2 or other icon */}
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
                fillRule="evenodd"
                clipRule="evenodd"
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
          <Button
            className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
            onClick={() => setShowSuccess(false)}
          >
            Back to Home
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
