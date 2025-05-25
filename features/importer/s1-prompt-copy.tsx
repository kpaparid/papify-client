import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Copy } from "lucide-react";
import { useState } from "react";
import { BsCheck2, BsClipboard } from "react-icons/bs";

export default function PromptCopy({ onNext }: { onNext: () => void }) {
  // Template prompt for ChatGPT
  const [copied, setCopied] = useState(false);

  // Copy the prompt template to clipboard
  const copyPrompt = () => {
    navigator.clipboard.writeText(promptTemplate);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section>
      {/* <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Copy the Prompt Template</h2>
        <p className="text-sm font-medium text-muted-foreground">
          Copy this prompt and paste it into ChatGPT. It will generate a list of tracks in the correct format for importing.
        </p>
      </div> */}
      <div className="bg-background/25 border border-background/30 p-4 rounded-md mb-6 mt-2 whitespace-pre-wrap font-mono text-sm">{promptTemplate}</div>
      <div className="flex justify-between">
        <Button onClick={copyPrompt} className="bg-foreground! text-primary hover:brightness-80 cursor-pointer">
          {copied ? <BsCheck2 className="mr-1" /> : <Copy className="mr-1" />}
          {copied ? "Copied" : "Copy Prompt"}
        </Button>
        <Button onClick={onNext} className="bg-foreground! text-primary hover:brightness-80 cursor-pointer">
          Next
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
const promptTemplate = `Please generate a list of music tracks in exactly this format:
<song name> || <artist1, artist2, ...>

For example:
Bohemian Rhapsody || Queen
Blinding Lights || The Weeknd
Old Town Road || Lil Nas X, Billy Ray Cyrus

Please provide 10 tracks that are [genre/mood/era] music.`;
