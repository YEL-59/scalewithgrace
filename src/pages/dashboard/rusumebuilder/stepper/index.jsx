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
import { useResumeById } from "@/hooks/resumebuild.hook";
import { useEffect } from "react";

// import FinalStep from "./steps/FinalStep";

const steps = ["Your Details", "Experience", "Education", "Skills", "Template"];

const ResumeBuilderStepper = () => {
  const { setFormData } = useResume();

  const location = useLocation();

  const generatedSummary =
    location?.state?.summary || localStorage.getItem("resumeSummary") || "";

  const resumeId = location.state?.resumeId;

  const { data: resumeData, isLoading } = useResumeById(resumeId);

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
      certifications: [],
      projects: [],
      skills: [],
      social_links: {
        linkedin: "",
        github: "",
        twitter: "",
        website: "",
      },
      interests: [],
    },
  });

  useEffect(() => {
    if (resumeData) {
      methods.reset({
        firstName: resumeData.user_profile?.full_name?.split(" ")[0] || "",
        lastName: resumeData.user_profile?.full_name?.split(" ")[1] || "",
        email: resumeData.user_profile?.email || "",
        phone: resumeData.user_profile?.phone || "",
        linkedin: resumeData.user_profile?.social_links?.linkedin || "",
        summary: resumeData.user_profile?.summary?.profile || "",
        address: resumeData.user_profile?.address || "",
        state: resumeData.user_profile?.state || "",
        city: resumeData.user_profile?.city || "",
        website: resumeData.user_profile?.website || "",
        experiences: resumeData.user_profile?.experience || [],
        education: resumeData.user_profile?.education || [],
        certifications: resumeData.user_profile?.certifications || [],
        projects: resumeData.user_profile?.projects || [],
        skills: resumeData.user_profile?.skills || [],
        social_links: resumeData.user_profile?.social_links || {
          linkedin: "",
          github: "",
          twitter: "",
          website: "",
        },
        interests: resumeData.user_profile?.interests || [],
      });
    }
  }, [resumeData, methods]);

  //  const [step, setStep] = useState(0);
  const initialStep = location.state?.startStep ?? 0;
  const [step, setStep] = useState(initialStep);
  const StepComponent = [
    YourDetails,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    CVTemplateGallery,
  ][step];

  // const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const next = methods.handleSubmit((data) => {
    console.log(`📌 Step ${step + 1} Data:`, data); // log all current form values
    setStep((s) => Math.min(s + 1, steps.length - 1));
  });

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data) => {
    console.log("🎉 Final Resume Data:", data);
    setFormData(data); // <-- THIS UPDATES THE CONTEXT AND localStorage
  };
  if (isLoading)
    return <p className="text-center mt-10">Loading saved resume...</p>;
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Stepper */}
        <div className="flex w-full overflow-x-auto gap-2">
          {steps.map((label, index) => {
            const isActive = index === step;
            return (
              <div
                key={index}
                className={`relative flex items-center px-6 py-3.5 text-sm font-medium select-none
        ${
          isActive
            ? "bg-white text-[#1e3a8a]   z-10 scale-105"
            : "bg-blue-50 text-gray-500 hover:text-blue-700 cursor-pointer"
        }
        transition-transform duration-300 ease-in-out
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
                      : "polygon(0 0, 95% 0%, 100% 50%, 95% 100%, 0 100%, 5% 50%)",
                  transition: "clip-path 0.3s ease-in-out",
                }}
                onClick={() => setStep(index)} // optional, lets user jump steps on click
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
              className="px-4 py-2 bg-primary text-white rounded"
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
