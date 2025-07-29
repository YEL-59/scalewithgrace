import { createContext, useContext, useEffect, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("resumeData");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to parse resume data:", e);
      return {};
    }
  });

  useEffect(() => {
    if (formData) {
      localStorage.setItem("resumeData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <ResumeContext.Provider value={{ formData, setFormData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
