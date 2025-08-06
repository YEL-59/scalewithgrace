import { Textarea } from "@/components/ui/textarea";
import PenIcon from "@/assets/svg/pen-icon";

const PromptInput = ({ prompt, setPrompt }) => {
  return (
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
  );
};

export default PromptInput;
