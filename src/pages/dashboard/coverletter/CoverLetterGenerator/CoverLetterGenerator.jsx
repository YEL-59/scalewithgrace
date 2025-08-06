import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  useCreateCoverLetter,
  useGenerateCoverLetter,
} from "@/hooks/coverletter.hook";
import { usePageMeta } from "@/hooks/usePageMeta.hook";

import ActionButtons from "./ActionButtons";
import PersonalInfoForm from "./PersonalInfoForm";
import FileUploadSection from "./FileUploadSection";
import PromptInput from "./PromptInput";
import CoverLetterPreview from "./CoverLetterPreview";

// Subcomponents

const CoverLetterGenerator = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    title: "",
    email: "",
    phone: "",
    company: "",
    companyAddress: "",
    hiringManager: "",
  });

  const [showDetails, setShowDetails] = useState(false);
  const [aiLetter, setAiLetter] = useState(null);
  const [isPreviewReady, setIsPreviewReady] = useState(false);

  const { mutate: generateCoverLetter, isPending: isGenerating } =
    useGenerateCoverLetter();
  const { mutate: createCoverLetter, isPending: isSaving } =
    useCreateCoverLetter();

  usePageMeta({
    title: "Cover Letter – Karially",
    description: "Generate and customize your cover letter with Karially.",
  });

  // Optional: for debouncing auto-save or state sync
  const [debouncedData, setDebouncedData] = useState({ form, aiLetter });
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedData({ form, aiLetter });
    }, 500);
    return () => clearTimeout(handler);
  }, [form, aiLetter]);

  // === Generate AI Letter ===
  const handleGenerate = () => {
    if (!form.full_name || !form.title || !form.company) {
      alert("Please fill in your name, job title, and company name.");
      return;
    }
    if (!file) {
      alert("Please upload a resume or job description file.");
      return;
    }
    if (prompt.trim() === "") {
      alert("Please enter a prompt.");
      return;
    }

    generateCoverLetter(
      { prompt_text: prompt, file },
      {
        onSuccess: (res) => {
          const aiBody = res?.data || {};
          setAiLetter({
            intro: aiBody.intro || "",
            body: aiBody.body || "",
            conclusion: aiBody.conclusion || "",
          });
          setIsPreviewReady(true);
        },
        onError: () => alert("Failed to generate cover letter."),
      }
    );
  };

  // === Save or Save & Regenerate ===
  const handleSave = async ({ regenerate = false } = {}) => {
    if (!aiLetter) {
      alert("Please generate a cover letter before saving.");
      return;
    }

    const finalLetter = {
      intro: aiLetter.intro || "",
      body: aiLetter.body || "",
      conclusion: aiLetter.conclusion || "",
    };

    const payload = {
      ...form,
      summary: finalLetter,
      template_name: "1",
    };

    try {
      await createCoverLetter(payload);
      alert("Cover letter saved successfully!");
    } catch (err) {
      console.error("Save error", err);
      alert("Failed to save cover letter.");
    }

    // === Regenerate flow ===
    if (regenerate) {
      if (!file) {
        alert("Cannot regenerate: Missing original file.");
        return;
      }

      const regeneratePrompt = `
${finalLetter.intro}

${finalLetter.body}

${finalLetter.conclusion}
`.trim();

      generateCoverLetter(
        { prompt_text: regeneratePrompt, file },
        {
          onSuccess: (res) => {
            const aiBody = res?.data || {};
            setAiLetter({
              intro: aiBody.intro || finalLetter.intro,
              body: aiBody.body || finalLetter.body,
              conclusion: aiBody.conclusion || finalLetter.conclusion,
            });
            alert("Cover letter regenerated successfully!");
          },
          onError: (err) => {
            console.error("Regenerate error", err);
            alert("Failed to regenerate cover letter.");
          },
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      {/* Header */}
      <div
        className="max-w-7xl mx-auto text-center md:text-left mb-10"
        data-aos="fade-up"
      >
        <h1 className="text-[#191919] font-poppins text-3xl md:text-5xl lg:text-[64px] font-semibold leading-tight max-w-5xl">
          Build Your Professional Cover Letter
        </h1>
        <p className="text-[#717171] font-poppins text-lg md:text-xl lg:text-[24px] mt-4">
          Let’s take the next step in your career today
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto items-start">
        {/* Left Column */}
        <Card className="p-6 flex flex-col gap-6 border-0 shadow-xl">
          <FileUploadSection file={file} onFileSelect={setFile} />
          <PromptInput prompt={prompt} setPrompt={setPrompt} />

          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100"
          >
            {showDetails ? "Hide Personal Info" : "Add Personal Info"}
          </button>

          {showDetails && <PersonalInfoForm form={form} setForm={setForm} />}

          <ActionButtons
            onGenerate={handleGenerate}
            onSave={handleSave}
            isGenerating={isGenerating}
            isSaving={isSaving}
            hasLetter={!!aiLetter}
          />
        </Card>

        {/* Right Column */}
        <CoverLetterPreview
          form={form}
          aiLetter={aiLetter}
          setAiLetter={setAiLetter}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
