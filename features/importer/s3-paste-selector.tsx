import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SetStateAction, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function PasteSelector({
  parsedTracks,
  onBack,
  onNext,
  selectedTracks,
  setSelectedTracks,
}: {
  parsedTracks: { title: string; artists: string[] }[];
  onBack: () => void;
  onNext: () => void;
  selectedTracks: number[];
  setSelectedTracks: React.Dispatch<SetStateAction<number[]>>;
}) {
  return (
    <section>
      <div className="bg-background/25 border border-background/30  rounded-md p-2 mb-6 mt-2 max-h-[300px] overflow-y-auto">
        {parsedTracks.map((track, index) => (
          <div key={index} className="p-3 border-b border-accent last:border-0 flex items-center">
            <Checkbox
              id={`track-${index}`}
              checked={selectedTracks.some((selected) => selected === index)}
              onCheckedChange={() => setSelectedTracks((prev) => (prev.includes(index) ? prev.filter((selected) => selected !== index) : [...prev, index]))}
              className="mr-5 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground text-primary! border-accent"
            />
            <label htmlFor={`track-${index}`} className="flex-1 cursor-pointer">
              <div className="font-medium text-foreground">{track.title}</div>
              <div className="text-sm text-muted-foreground font-semibold">{track.artists.join(", ")}</div>
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={onBack} className="bg-foreground! text-primary hover:brightness-80 cursor-pointer">
          <ArrowLeft /> Back
        </Button>
        <Button onClick={onNext} className="bg-foreground! text-primary hover:brightness-80 cursor-pointer">
          Next
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
