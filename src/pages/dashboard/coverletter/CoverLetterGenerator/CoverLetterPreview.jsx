import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CoverLetterPDF from "../CoverLetterPDF";

const CoverLetterPreview = ({ form, aiLetter, setAiLetter, handleSave }) => {
  if (!aiLetter) {
    return (
      <div className="w-full h-[700px] flex items-center justify-center border border-dashed border-gray-300 bg-[#F6F8FE] rounded-md text-gray-500">
        Cover Letter Preview will appear here after generation
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="bg-white border border-gray-300 rounded-md shadow-sm p-8 h-[700px] overflow-auto font-serif">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 border-b border-gray-400 pb-2">
          <div>
            <h2 className="text-xl font-bold uppercase">{form.full_name}</h2>
            <p className="text-sm">{form.title}</p>
          </div>
          <div className="text-right text-xs leading-4">
            <p>{form.email}</p>
            <p>{form.phone}</p>
          </div>
        </div>

        {/* Date & Company */}
        <p className="text-xs mb-2">{new Date().toLocaleDateString()}</p>
        {form.company && (
          <p className="font-semibold text-sm">{form.company}</p>
        )}
        {form.companyAddress && (
          <p className="text-xs mb-4">{form.companyAddress}</p>
        )}

        {/* Greeting */}
        <p className="mb-4">Dear {form.hiringManager || "Hiring Manager"},</p>

        {/* Editable Letter */}
        {["intro", "body", "conclusion"].map((section, idx) => (
          <Textarea
            key={section}
            className="mb-4 text-justify w-full border-none shadow-none focus:ring-0 resize-none"
            rows={idx === 1 ? 6 : 4}
            value={aiLetter[section]}
            onChange={(e) =>
              setAiLetter({ ...aiLetter, [section]: e.target.value })
            }
          />
        ))}

        {/* Closing */}
        <div className="mt-6">
          <p>Sincerely,</p>
          <p className="font-bold mt-2">{form.full_name}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-xl mx-auto flex justify-between gap-3 mt-2">
        <Button
          onClick={() => handleSave({ regenerate: false })}
          className="bg-green-600 text-white"
        >
          Save Changes
        </Button>

        <Button
          onClick={() => handleSave({ regenerate: true })}
          className="bg-blue-600 text-white"
        >
          Save & Regenerate
        </Button>

        <PDFDownloadLink
          document={<CoverLetterPDF form={form} data={aiLetter} />}
          fileName={`${form.full_name || "cover_letter"}.pdf`}
        >
          {({ loading }) => (
            <Button className="bg-gradient-to-r from-primary to-secondary text-white">
              {loading ? "Preparing PDF..." : "Download as PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
