import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import PenIcon from "@/assets/svg/pen-icon";
import UploadIcon from "@/assets/svg/upload-icon";
import { useGenerateCoverLetter } from "@/hooks/coverletter.hook";
import { usePageMeta } from "@/hooks/usePageMeta.hook";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import CoverLetterPDF from "./CoverLetterPDF";

const CoverLetterGenerator = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    company: "",
    companyAddress: "",
    hiringManager: "",
  });

  const [showDetails, setShowDetails] = useState(false);
  //const previewRef = useRef(null);
  const fileInputRef = useRef(null);
  const { mutate, data, isPending, isSuccess, error } =
    useGenerateCoverLetter();

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];

    const allowedTypes = [
      "application/pdf",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "text/plain", // .txt
    ];

    if (selected && allowedTypes.includes(selected.type)) {
      setFile(selected);
    } else {
      alert("Only DOC, DOCX, PDF, or TXT files are supported.");
    }
  };

  const handleGenerate = () => {
    if (!form.name || !form.title || !form.company) {
      alert("Please fill in your name, job title, and company name.");
      return;
    }

    if (file && prompt.trim() !== "") {
      mutate(
        { prompt_text: prompt, file },
        {
          onSuccess: () => setShowPreview(true),
        }
      );
    }
  };

  // const handlePrint = () => {
  //   if (!previewRef.current) return;

  //   const printWindow = window.open("", "_blank", "width=800,height=600");
  //   printWindow.document.write(`
  //   <html>
  //     <head>
  //       <title>Print Cover Letter</title>
  //       <style>
  //         body {
  //           font-family: 'Times New Roman', serif;
  //           padding: 40px;
  //           line-height: 1.6;
  //           color: #1f2937;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       ${previewRef.current.innerHTML}
  //     </body>
  //   </html>
  // `);
  // };

  usePageMeta({
    title: "Cover Letter – Karially",
    description: "Generate and customize your cover letter with Karially.",
  });
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
        {/* Left Side */}
        <Card
          className="p-6 flex flex-col justify-between gap-6 border-0 shadow-xl h-auto max-h-[750px]"
          data-aos="fade-right"
        >
          {/* Upload Area */}
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
                Supported formats: PDF
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
          {/* Toggle Button */}
          <Button
            variant="outline"
            onClick={() => setShowDetails((prev) => !prev)}
            className="w-full md:w-auto"
          >
            {showDetails ? "Hide Personal Info" : "Add Personal Info"}
          </Button>

          {/* Conditional Personal Info Form */}
          {showDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input
                placeholder="Your Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                placeholder="Your Job Title (e.g., Frontend Developer)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                placeholder="Phone Number"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder="Company Name"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <Input
                placeholder="Company Address"
                value={form.companyAddress}
                onChange={(e) =>
                  setForm({ ...form, companyAddress: e.target.value })
                }
              />
              <Input
                placeholder="Hiring Manager's Name (optional)"
                value={form.hiringManager}
                onChange={(e) =>
                  setForm({ ...form, hiringManager: e.target.value })
                }
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-2">
            {/* <Button variant="outline" className="w-full md:w-auto">
              Sample Prompts
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              Job Description
            </Button> */}
            <Button
              onClick={handleGenerate}
              className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary"
              disabled={isPending}
            >
              {isPending ? (
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
                "Generate Cover Letter"
              )}
            </Button>
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </Card>

        {/* Right Side - Output */}
        {showPreview && isSuccess && data?.data && (
          <div>
            {/* Live PDF Preview */}
            <PDFViewer
              width="100%"
              height="700"
              style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            >
              <CoverLetterPDF form={form} data={data} />
            </PDFViewer>
            <div
              style={{ fontFamily: "'Times New Roman', serif" }}
              className="max-w-xl mx-auto flex justify-end gap-3 mt-2"
            >
              <PDFDownloadLink
                document={<CoverLetterPDF form={form} data={data} />}
                fileName={`${form.name || "cover_letter"}.pdf`}
              >
                {({ loading }) => (
                  <Button className="bg-gradient-to-r from-primary to-secondary text-white">
                    {loading ? "Preparing PDF..." : "Download as PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
              {/* <Button
                onClick={handlePrint}
                className="bg-gradient-to-r from-primary to-secondary text-white "
              >
                Print
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
