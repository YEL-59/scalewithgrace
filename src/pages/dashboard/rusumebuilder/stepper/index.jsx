// components/ResumeBuilder.jsx
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import YourDetails from "../step/yourdetails";
import ExperienceSection from "../step/experiencesection";
import EducationSection from "../step/educationsection";
import SkillsSection from "../step/skillssection";
import CVTemplateGallery from "../step/cvtemplategallery";
import { useResume } from "../resumeContext";
import { useLocation } from "react-router";

// import FinalStep from "./steps/FinalStep";

const steps = ["Your Details", "Experience", "Education", "Skills", "Template"];

const ResumeBuilderStepper = () => {
  const { setFormData } = useResume();

  const location = useLocation();

  const generatedSummary =
    location?.state?.summary || localStorage.getItem("resumeSummary") || "";

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedin: "",
      summary: generatedSummary,
      address: "",
      city: "",
      state: "",
      website: "",
      experiences: [],
      education: [],
      skills: [],
    },
  });

  const [step, setStep] = useState(0);
  const StepComponent = [
    YourDetails,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    CVTemplateGallery,
  ][step];

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data) => {
    console.log("🎉 Final Resume Data:", data);
    setFormData(data); // <-- THIS UPDATES THE CONTEXT AND localStorage
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Stepper */}<div className="flex w-full overflow-x-auto gap-2">
          {steps.map((label, index) => {
            const isActive = index === step;
            return (
              <div
                key={index}
                className={`relative flex items-center px-6 py-3.5 text-sm font-medium 
              ${
                isActive
                  ? "bg-white text-[#4a7c9a] border border-[#488099] z-10"
                  : "bg-blue-50 text-gray-500"
              }
              ${index === 0 ? "rounded-l-full" : ""}
              ${index === steps.length - 1 ? "rounded-r-full" : ""}
              after:absolute after:top-0 after:right-0 after:h-full after:w-4
              ${
                index < steps.length - 1
                  ? isActive
                    ? "after:bg-white after:clip-path-triangle-right"
                    : "after:bg-blue-50 after:clip-path-triangle-right"
                  : "after:hidden"
              }
            `}
                style={{
                  clipPath:
                    index === 0
                      ? "polygon(0 0, 95% 0%, 100% 50%, 95% 100%, 0 100%)"
                      : index === steps.length - 1
                      ? "polygon(0 0, 100% 0%, 100% 100%, 0% 100%, 5% 50%)"
                      : "polygon(0 0, 95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%)",
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
        

        {/* Grid Layout */}
        <div className="grid grid-cols-1  gap-6">
          <div>
            <StepComponent />
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save Resume
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default ResumeBuilderStepper;
