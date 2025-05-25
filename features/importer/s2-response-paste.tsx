import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { BsEye } from "react-icons/bs";

export default function ResponsePaste({
  onBack,
  onNext,
  onPaste,
  pastedText,
}: {
  onBack: () => void;
  onNext: () => void;
  onPaste: (text: string) => void;
  pastedText: string;
}) {
  return (
    <section>
      {/* <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Step 2: Paste ChatGPT Response</h2>
          <p className="text-sm font-medium text-muted-foreground">
            Paste the response from ChatGPT below. Make sure it follows the format:
            <code className="bg-background/25 border border-background/30 font-semibold px-2 py-1 rounded ml-2 text-foreground/50">
              &lt;song name&gt; || &lt;artist1, artist2, ...&gt;
            </code>
          </p>
        </div> */}
      <Textarea
        value={pastedText}
        onChange={(e) => onPaste(e.target.value)}
        placeholder="Paste the ChatGPT response here..."
        className="min-h-[200px] font-mono bg-background/25 border border-background/30 font-semibold mb-6 mt-2"
      />
      <div className="flex justify-between">
        <Button onClick={onBack} className="bg-foreground! text-primary hover:brightness-80 cursor-pointer">
          <ArrowLeft className="mr-0" /> Back
        </Button>
        <Button onClick={onNext} className="bg-foreground! text-primary hover:brightness-80 cursor-pointer" disabled={!pastedText.trim()}>
          Next
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
