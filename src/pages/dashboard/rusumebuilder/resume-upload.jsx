import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useGenerateResumeByFilePrompt } from "@/hooks/resumebuild.hook";

const ResumeUploadPrompt = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [generatedResume, setGeneratedResume] = useState(null);

  const { mutate, isLoading } = useGenerateResumeByFilePrompt();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    mutate(
      { file, prompt_text: prompt },
      {
        onSuccess: (data) => {
          console.log("Generated Resume:", data);
          setGeneratedResume(data.data); // store the resume data
        },
        onError: (error) => {
          console.error("Error generating resume:", error);
          //alert("Failed to generate resume. Check console for details.");
        },
      }
    );
  };

  const handleSamplePrompt = () => {
    setPrompt(
      "Please summarize my resume highlighting key skills, experience, and achievements for a software engineering position."
    );
  };

  const handleCardClick = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* File Upload Card */}
      <Card
        className="border-dashed border-2 border-gray-300 flex flex-col items-center justify-center py-12 cursor-pointer hover:border-blue-500 transition"
        onClick={handleCardClick}
      >
        <CardContent className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l3 3m-3-3l-3 3m6 4H6"
            />
          </svg>
          <h2 className="font-semibold text-lg">
            Upload your Resume or Job Description
          </h2>
          <CardDescription>
            Drag and drop your file or click anywhere on this card to select a
            file
          </CardDescription>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          {file && (
            <p className="mt-2 text-gray-600 text-sm font-medium">
              {file.name}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Prompt Textarea */}
      <div className="space-y-2">
        <Label htmlFor="prompt">Prompt</Label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
        <p className="text-gray-500 text-sm">
          Example: "Please summarize my resume highlighting key skills,
          experience, and achievements."
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={handleSamplePrompt}>
          Sample Prompt
        </Button>
        <Button
          className="bg-gradient-to-r from-primary to-secondary flex items-center justify-center gap-2"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
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
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {isLoading ? "Generating..." : "Generate Resume"}
        </Button>
      </div>

      {/* Generated Resume Display */}
      {generatedResume && (
        <div className="mt-6 p-6 bg-gray-50 border rounded-lg space-y-4">
          <h2 className="text-2xl font-bold">{generatedResume.title}</h2>
          <p>
            <strong>Full Name:</strong> {generatedResume.full_name}
          </p>
          <p>
            <strong>Job Title:</strong> {generatedResume.job_title}
          </p>
          <p>
            <strong>Email:</strong> {generatedResume.email}
          </p>
          <p>
            <strong>Phone:</strong> {generatedResume.phone}
          </p>
          <p>
            <strong>Website:</strong> {generatedResume.website}
          </p>
          <p>
            <strong>Address:</strong> {generatedResume.address}
          </p>
          <div>
            <strong>Profile Summary:</strong>
            <p>{generatedResume.summary.profile}</p>
          </div>
          <div>
            <strong>Skills:</strong> {generatedResume.skills.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploadPrompt;
