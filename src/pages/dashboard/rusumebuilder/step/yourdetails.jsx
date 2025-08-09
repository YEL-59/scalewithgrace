import { useFormContext, useWatch } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ResumePreview from "../resumePreview";
import { Loader2, Sparkles } from "lucide-react";
import { useResumeBuilderSummeryText } from "@/hooks/resumebuild.hook";
import { useState } from "react";

const YourDetails = () => {
  const methods = useFormContext();
  const values = useWatch({ control: methods.control });
  const { control, setValue } = methods;
  // Watch live form values
  const { summary, refinePrompt } = useWatch({ control });

  // Hook for refinement API
  const { mutate: refineSummary, isPending } = useResumeBuilderSummeryText();

  // Handle refinement request
  const [showRefine, setShowRefine] = useState(false);

  const handleUpdateClick = () => {
    if (!showRefine) {
      // First click → show the refine input
      setShowRefine(true);
      return;
    }

    if (!refinePrompt) return; // no input yet

    // Second click → send to API
    refineSummary(
      {
        prompt_text: `Here is my current resume summary:\n"${summary}"\n\nPlease refine it as follows: ${refinePrompt}`,
      },
      {
        onSuccess: (data) => {
          setValue("summary", data.data); // ✅ update summary
          setValue("refinePrompt", ""); // clear prompt
          setShowRefine(false); // hide refine box again if you want
        },
      }
    );
  };

  const onSubmit = (data) => {
    console.log("YourDetails submitted:", data);
  };

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
    >
      {/* Left Form */}
      <div className="space-y-4 bg-white rounded p-6 h-full">
        <h1 className="text-2xl font-bold mb-6">Contact Information</h1>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            name="firstName"
            label="First Name*"
            placeholder="Nazmul"
          />
          <TextInput name="lastName" label="Last Name*" placeholder="Hasan" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            name="email"
            label="Email*"
            placeholder="example@mail.com"
          />
          <TextInput name="phone" label="Phone*" placeholder="88017724999675" />
        </div>

        <TextInput name="title" label="Title" placeholder="Web Developer" />
        <TextInput
          name="linkedin"
          label="LinkedIn"
          placeholder="linkedin.com/in/..."
        />

        <div className="space-y-6">
          {/* AI Summary */}
          <div>
            <label className="block text-sm font-medium mb-1">
              AI Generated Summary
            </label>
            <Textarea
              value={summary || ""}
              onChange={(e) => setValue("summary", e.target.value)}
              placeholder="Your AI-generated resume summary will appear here..."
              rows={6}
            />
          </div>

          {/* Refine Button & Input */}
          <div>
            {showRefine && (
              <Textarea
                value={refinePrompt || ""}
                onChange={(e) => setValue("refinePrompt", e.target.value)}
                placeholder="e.g. Make it more concise, add leadership skills, highlight tech stack..."
                rows={3}
                className="mb-2"
              />
            )}

            <Button
              type="button"
              onClick={handleUpdateClick}
              disabled={isPending || (showRefine && !refinePrompt)}
            >
              {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              {isPending
                ? "Updating..."
                : showRefine
                ? "Apply Changes"
                : "Update Summary"}
            </Button>
          </div>
        </div>
        {/* Address Section */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <TextInput name="address" label="Address" placeholder="123 Street" />
          <TextInput name="city" label="City" placeholder="Sylhet" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextInput name="state" label="State" placeholder="Dhaka" />
          <TextInput
            name="website"
            label="Website"
            placeholder="www.example.com"
          />
        </div>
      </div>

      {/* Right Preview */}
      <div className="rounded p-2 h-full">
        <h1 className="text-2xl font-medium mb-4 font-poppins">Preview</h1>
        <ResumePreview values={values} />
      </div>
    </form>
  );
};

export default YourDetails;

/* -----------------------
   Reusable Inputs
------------------------*/
const TextInput = ({ name, label, placeholder }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const TextAreaInput = ({ name, label, placeholder }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
