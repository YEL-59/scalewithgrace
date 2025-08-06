import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { axiosPrivate } from "@/lib/axios.config";
import { Loader2, ArrowLeft } from "lucide-react";

import CoverLetterPDF from "./CoverLetterPDF";

const CoverLetterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch cover letter data by id
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coverLetter", id],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/cover-letters/${id}`);
      return response.data?.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mb-2" />
        Loading cover letter...
      </div>
    );

  if (isError || !data)
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load cover letter.
      </div>
    );

  // Extract the form data & summary from API response
  const form = {
    full_name: data.user_profile?.full_name || "",
    title: data.user_profile?.job_title || "",
    email: data.user_profile?.email || "",
    phone: data.user_profile?.phone || "",
    company: data.company || "",
    companyAddress: data.companyAddress || "",
    hiringManager: data.hiringManager || "",
  };

  const summary = data.user_profile?.summary || {};

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header with Back and Download Button */}
      <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/all-cover-letters")}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-lg font-semibold">
            {data.title || "Cover Letter"}
          </h1>
        </div>

        <PDFDownloadLink
          document={<CoverLetterPDF data={summary} form={form} />}
          fileName={`${form.full_name || "cover_letter"}.pdf`}
        >
          {({ loading }) => (
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              {loading ? "Preparing..." : "Download PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      {/* PDF Preview */}
      <div className="flex-1 h-[calc(100vh-64px)]">
        {/* 64px header height approx */}
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <CoverLetterPDF data={summary} form={form} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default CoverLetterDetails;
