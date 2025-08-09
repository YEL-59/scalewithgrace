import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadIcon from "@/assets/svg/upload-icon";

const FileUploadSection = ({ file, onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (selected && allowedTypes.includes(selected.type)) {
      onFileSelect(selected);
    } else {
      alert("Only DOC, DOCX, PDF, or TXT files are supported.");
    }
  };

  return (
    <div>
      <div className="border border-dashed border-gray-300 bg-[#F6F8FE] rounded-md p-6 flex flex-col items-center justify-center cursor-pointer">
        <UploadIcon className="w-10 h-5 text-gray-500" />
        <h2 className="text-[#020817] text-center font-poppins text-[16px] font-normal mb-2 mt-2">
          Upload your Resume / Job Description
        </h2>
        <span className="text-[#6B7280] text-center font-poppins text-[14px] mb-2">
          Drag and drop your resume/job description or click to browse
        </span>
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-gradient-to-r from-primary to-secondary rounded-full font-normal mb-1"
        >
          Select File
        </Button>
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
  );
};

export default FileUploadSection;
