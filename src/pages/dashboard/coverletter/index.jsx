import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import PenIcon from "@/assets/svg/pen-icon";
import { useRef } from "react";
import UploadIcon from "@/assets/svg/upload-icon";

const CoverLetterGenerator = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ref to access the hidden file input
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type.includes("pdf")) {
      setFile(selected);
    } else {
      alert("Only PDF files are supported for now.");
    }
  };

  const handleGenerate = () => {
    if (file && prompt.trim() !== "") {
      setLoading(true);
      setTimeout(() => {
        setShowPreview(true);
        setLoading(false);
      }, 2000);
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Left Side */}
        <Card
          className="p-6 flex flex-col justify-between gap-6 border-0 shadow-xl h-auto"
          data-aos="fade-right"
        >
          <div>
            <div className="border border-dashed border-gray-300 bg-[#F6F8FE] rounded-md p-6 flex flex-col items-center justify-center cursor-pointer">
              <UploadIcon className="w-10 h-5 text-gray-500" />
              <h2 className="text-[#020817] text-center font-poppins text-[16px] font-normal leading-none mb-2 mt-2">
                Upload your Resume / Job Description
              </h2>
              <span className="text-[#6B7280] text-center font-poppins text-[14px] font-normal leading-none mb-2">
                Drag and drop your resume/job description or click to browse
              </span>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-primary to-secondary rounded-full font-normal mb-1"
              >
                Select File
              </Button>
              <span className="text-[#6B7280] text-center font-poppins text-[14px] font-normal leading-none">
                Supported formats: PDF, DOCX, TXT
              </span>
              {/* Hidden file input */}
              <Input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {file && (
              <p className="text-sm text-green-600 mt-2 text-center md:text-left">
                ✅ {file.name} selected
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

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-2">
            <Button variant="outline" className="w-full md:w-auto">
              Sample Prompts
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              Job Description
            </Button>
            <Button
              onClick={handleGenerate}
              className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Cover"
              )}
            </Button>
          </div>
        </Card>

        {/* Right Side */}
        {showPreview && (
          <Card className="p-6" data-aos="fade-left">
            <CardContent className="space-y-4 text-sm text-gray-700">
              <div className="text-right text-xs text-gray-400">
                09 February 2024
              </div>
              <h1 className="text-xl font-bold">Nazmul Hasan</h1>
              <p className="text-sm font-medium text-gray-600">UX Designer</p>

              <p>Dear Hiring Manager,</p>

              <p>
                I am excited to express my strong interest in the UX/UI Product
                Designer role at Mixamprint. With a passion for creating
                seamless digital experiences and a track record of delivering
                innovative user-centered designs, I am confident in my ability
                to contribute to your team’s success...
              </p>

              <p>
                Thank you for your consideration, and I eagerly await the
                opportunity to discuss this exciting opportunity further.
              </p>

              <p>
                Sincerely,
                <br />
                Nazmul Hasan
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
