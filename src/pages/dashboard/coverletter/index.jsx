import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

import PenIcon from "@/assets/svg/pen-icon";
import UploadIcon from "@/assets/svg/upload-icon";
import {
  useCreateCoverLetter,
  useGenerateCoverLetter,
  useUpdateCoverLetter,
} from "@/hooks/coverletter.hook";
import { usePageMeta } from "@/hooks/usePageMeta.hook";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CoverLetterPDF from "./CoverLetterPDF";
import { Link } from "react-router";

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
  const fileInputRef = useRef(null);

  const [aiLetter, setAiLetter] = useState(null);
  const [originalLetter, setOriginalLetter] = useState(null);
  const [hasChanges, setHasChanges] = useState(false); //hide the btn
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: generateCoverLetter, isPending: isGenerating } =
    useGenerateCoverLetter();
  const {
    createCoverLetter, // mutate function
    isPending: isSaving,
  } = useCreateCoverLetter();

  const { mutate: updateCoverLetter, isPending: isUpdating } =
    useUpdateCoverLetter();

  // 📂 Handle file selection
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (selected && allowedTypes.includes(selected.type)) {
      setFile(selected);
    } else {
      alert("Only DOC, DOCX, PDF, or TXT files are supported.");
    }
  };

  // 🎯 Generate AI cover letter
  const handleGenerate = () => {
    if (!form.full_name || !form.title || !form.company) {
      return alert("Please fill in your name, job title, and company name.");
    }
    if (!file) return alert("Please upload a resume or job description file.");
    if (!prompt.trim()) return alert("Please enter a prompt.");

    generateCoverLetter(
      { prompt_text: prompt, file },
      {
        onSuccess: (res) => {
          const aiBody = res?.data || {};
          const newLetter = {
            intro: aiBody.intro || "",
            body: aiBody.body || "",
            conclusion: aiBody.conclusion || "",
          };
          setAiLetter(newLetter);
          setOriginalLetter(newLetter); // snapshot for change detection
        },
      }
    );
  };

  // 🕵 Detect which section changed
  const getChangedSection = () => {
    if (!originalLetter || !aiLetter) return null;
    if (aiLetter.intro !== originalLetter.intro) return "intro";
    if (aiLetter.body !== originalLetter.body) return "body";
    if (aiLetter.conclusion !== originalLetter.conclusion) return "conclusion";
    return null;
  };

  // 🔄 Update only the changed section
  const handlePartialUpdate = () => {
    const changedSection = getChangedSection();
    if (!changedSection) {
      alert("No changes detected.");
      return;
    }

    const prompt_text = aiLetter[changedSection]; // only the changed section's current text

    updateCoverLetter(
      { prompt_text, type: "cv" },
      {
        onSuccess: (res) => {
          const updatedText = res?.data || prompt_text;

          // Replace only changed section in aiLetter state
          setAiLetter((prev) => ({
            ...prev,
            [changedSection]: updatedText,
          }));

          // Update originalLetter snapshot too, so next diff works correctly
          setOriginalLetter((prev) => ({
            ...prev,
            [changedSection]: updatedText,
          }));

          alert(`${changedSection} updated successfully!`);
          setHasChanges(false);
        },
        onError: () => {
          alert(`Failed to update ${changedSection}`);
        },
      }
    );
  };

  // 💾 Save final cover letter
  const handleSave = () => {
    // if (!aiLetter) return alert("Please generate a cover letter first.");

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

    createCoverLetter(payload, {
      onSuccess: (res) => {
        setIsSaved(true);
        // alert("Cover letter saved successfully!");
      },
      onError: () => {
        // alert("Failed to save cover letter.");
      },
    });
  };

  usePageMeta({
    title: "Cover Letter – Karially",
    description: "Generate and customize your cover letter with Karially.",
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center md:text-left mb-10">
        <h1 className="text-[#191919] font-poppins text-3xl md:text-5xl lg:text-[64px] font-semibold leading-tight max-w-5xl">
          Build Your Professional Cover Letter
        </h1>
        <p className="text-[#717171] font-poppins text-lg md:text-xl lg:text-[24px] mt-4">
          Let’s take the next step in your career today
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto items-start">
        {/* Left Side - Input Area */}
        <Card className="p-6 flex flex-col gap-6 border-0 shadow-xl">
          {/* File Upload */}
          <div>
            <div
              className="border border-dashed border-gray-300 bg-[#F6F8FE] rounded-md p-6 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon className="w-10 h-5 text-gray-500" />
              <h2 className="text-[#020817] text-center font-poppins text-[16px] font-normal mb-2 mt-2">
                Upload your Resume / Job Description
              </h2>
              <span className="text-[#6B7280] text-center font-poppins text-[14px]">
                Supported formats: PDF, DOC, DOCX, TXT
              </span>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {file && (
              <p className="text-sm text-green-600 mt-2 text-center md:text-left">
                {file.name} selected
              </p>
            )}
          </div>

          {/* Prompt */}
          <div>
            <label
              htmlFor="prompt"
              className="flex items-center gap-2 text-sm font-bold mb-2"
            >
              <PenIcon />
              Prompt
            </label>
            <Textarea
              id="prompt"
              placeholder="Enter prompt here..."
              className="bg-[#F6F8FE]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Personal Info */}
          <Button
            variant="outline"
            onClick={() => setShowDetails((prev) => !prev)}
            className="w-full md:w-auto"
          >
            {showDetails ? "Hide Personal Info" : "Add Personal Info"}
          </Button>

          {showDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                { key: "full_name", placeholder: "Your Full Name" },
                { key: "title", placeholder: "Your Job Title" },
                { key: "email", placeholder: "Email", type: "email" },
                { key: "phone", placeholder: "Phone Number", type: "tel" },
                { key: "company", placeholder: "Company Name" },
                { key: "companyAddress", placeholder: "Company Address" },
                { key: "hiringManager", placeholder: "Hiring Manager's Name" },
              ].map((field) => (
                <Input
                  key={field.key}
                  placeholder={field.placeholder}
                  type={field.type || "text"}
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                />
              ))}
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Cover Letter"}
          </Button>
        </Card>

        {/* Right Side - Editable Preview */}
        <div>
          {aiLetter ? (
            <>
              <div className="bg-white border border-gray-300 rounded-md shadow-sm p-8 h-[700px] overflow-auto font-serif">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 border-b border-gray-400 pb-2">
                  <div>
                    <h2 className="text-xl font-bold uppercase">
                      {form.full_name}
                    </h2>
                    <p className="text-sm">{form.title}</p>
                  </div>
                  <div className="text-right text-xs leading-4">
                    <p>{form.email}</p>
                    <p>{form.phone}</p>
                  </div>
                </div>

                {/* Date & Company */}
                <p className="text-xs mb-2">
                  {new Date().toLocaleDateString()}
                </p>
                {form.company && (
                  <p className="font-semibold text-sm">{form.company}</p>
                )}
                {form.companyAddress && (
                  <p className="text-xs mb-4">{form.companyAddress}</p>
                )}

                {/* Greeting */}
                <p className="mb-4">
                  Dear {form.hiringManager || "Hiring Manager"},
                </p>

                {/* Editable Sections */}
                {/* <Textarea
                  className="mb-4 text-justify w-full border-none shadow-none focus:ring-0 resize-none"
                  rows={4}
                  value={aiLetter.intro}
                  onChange={(e) =>
                    setAiLetter({ ...aiLetter, intro: e.target.value })
                  }
                /> */}
                <Textarea
                  className="mb-4 text-justify w-full border-none shadow-none focus:ring-0 resize-none"
                  rows={4}
                  value={aiLetter.intro}
                  onChange={(e) => {
                    const updated = { ...aiLetter, intro: e.target.value };
                    setAiLetter(updated);
                    setHasChanges(
                      updated.intro !== originalLetter?.intro ||
                        updated.body !== originalLetter?.body ||
                        updated.conclusion !== originalLetter?.conclusion
                    );
                  }}
                />

                {/* <Textarea
                  className="mb-4 text-justify w-full border-none shadow-none focus:ring-0 resize-none"
                  rows={6}
                  value={aiLetter.body}
                  onChange={(e) =>
                    setAiLetter({ ...aiLetter, body: e.target.value })
                  }
                /> */}
                <Textarea
                  className="mb-4 text-justify w-full border-none shadow-none focus:ring-0 resize-none"
                  rows={6}
                  value={aiLetter.body}
                  onChange={(e) => {
                    const updated = { ...aiLetter, body: e.target.value };
                    setAiLetter(updated);
                    setHasChanges(
                      updated.intro !== originalLetter?.intro ||
                        updated.body !== originalLetter?.body ||
                        updated.conclusion !== originalLetter?.conclusion
                    );
                  }}
                />
                {/* <Textarea
                  className="mb-4 text-justify w-full border-none shadow-none focus:ring-0 resize-none"
                  rows={4}
                  value={aiLetter.conclusion}
                  onChange={(e) =>
                    setAiLetter({ ...aiLetter, conclusion: e.target.value })
                  }
                    
                /> */}
                <Textarea
                  className="mb-4 text-justify w-full border-none shadow-none focus:ring-0 resize-none"
                  rows={6}
                  value={aiLetter.conclusion}
                  onChange={(e) => {
                    const updated = { ...aiLetter, conclusion: e.target.value };
                    setAiLetter(updated);
                    setHasChanges(
                      updated.intro !== originalLetter?.intro ||
                        updated.body !== originalLetter?.body ||
                        updated.conclusion !== originalLetter?.conclusion
                    );
                  }}
                />

                {/* Closing */}
                <div className="mt-6">
                  <p>Sincerely,</p>
                  <p className="font-bold mt-2">{form.full_name}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="max-w-xl mx-auto flex justify-between gap-3 mt-2">
                <Button
                  onClick={handleSave}
                  className="bg-green-600 text-white"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>

                {hasChanges && (
                  <Button
                    onClick={handlePartialUpdate}
                    className="bg-blue-600 text-white"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update Changed Section"}
                  </Button>
                )}

                {/* <PDFDownloadLink
                  document={<CoverLetterPDF form={form} data={aiLetter} />}
                  fileName={`${form.full_name || "cover_letter"}.pdf`}
                >
                  {({ loading }) => (
                    <Button className="bg-gradient-to-r from-primary to-secondary text-white">
                      {loading ? "Preparing PDF..." : "Download as PDF"}
                    </Button>
                  )}
                </PDFDownloadLink> */}
                {/* ✅ Navigation to All Cover Letters based after successful save  */}
                {isSaved && (
                  <>
                    <Link to="/dashboard/all-cover-letters">
                      <Button className="bg-purple-600 text-white">
                        Go to All Cover Letters
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-[700px] flex items-center justify-center border border-dashed border-gray-300 bg-[#F6F8FE] rounded-md text-gray-500">
              Cover Letter Preview will appear here after generation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
