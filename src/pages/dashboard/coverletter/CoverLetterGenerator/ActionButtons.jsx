import { Button } from "@/components/ui/button";

const ActionButtons = ({
  onGenerate,
  onSave,
  isGenerating,
  isSaving,
  hasLetter,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mt-2">
      <Button
        onClick={onGenerate}
        className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary"
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Cover Letter"}
      </Button>
      <Button
        onClick={() => onSave({ regenerate: false })}
        className="w-full md:w-auto bg-green-600 text-white"
        disabled={!hasLetter || isSaving}
      >
        {isSaving ? "Saving..." : "Save Cover Letter"}
      </Button>
    </div>
  );
};

export default ActionButtons;
