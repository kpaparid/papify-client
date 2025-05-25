"use client";

import { useState } from "react";
import { BsBoxArrowInUp, BsClipboard, BsCheck2, BsEye, BsSearch, BsCheckCircle, BsXCircle } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import PromptCopy from "./s1-prompt-copy";
import ResponsePaste from "./s2-response-paste";
import PasteSelector from "./s3-paste-selector";
import ReviewResponse from "./s4-review-response";
import Header from "@/components/header";
import { Accordion } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

interface Track {
  title: string;
  artists: string[];
  selected?: boolean;
}

export interface SearchResult2 {
  id: string;
  name: string;
  artists: string[];
  album?: {
    id: string;
    name: string;
    images: string[];
    release_date: string;
    total_tracks: number;
    artists: { id: string; name: string }[];
  };
  isSaved: boolean;
  popularity: number;
  score: number;
}

export default function ImportPage({ searchResults }: { searchResults: SearchResult2[] }) {
  const router = useRouter();

  const [inputText, setInputText] = useState("");
  const [currentStep, setCurrentStep] = useState(searchResults ? 4 : 1);
  const [selectedTracks, setSelectedTracks] = useState<number[]>([]);

  const parsedTracks = getParsedTracks();
  function getParsedTracks() {
    const lines = inputText.split("\n").filter((line) => line.trim() !== "");
    const tracks: Track[] = [];

    for (const line of lines) {
      // Check if line matches the expected format
      if (line.includes("||")) {
        const [title, artistsString] = line.split("||").map((part) => part.trim());
        const artists = artistsString.split(",").map((artist) => artist.trim());
        tracks.push({ title, artists, selected: true });
      }
    }
    return tracks;
  }

  return (
    <div className="w-full mx-auto max-w-[1320px] space-y-6">
      <Header title="Import" subtitle="Import a list of ai generated tracks" />

      <div className="grid gap-8">
        <Accordion value={`item-${currentStep}`} type="single" collapsible className="space-y-2">
          <AccordionItem value="item-1" className="border-accent bg-card px-6 rounded-xl border">
            <AccordionTrigger onClick={() => setCurrentStep(1)} className="items-center group hover:no-underline group hover:cursor-pointer">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1 group-hover:underline">Step 1: Copy the Prompt Template</h2>
                <p className="text-sm font-medium text-muted-foreground">
                  Copy this prompt and paste it into ChatGPT. It will generate a list of tracks in the correct format for importing.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <PromptCopy onNext={() => setCurrentStep(2)} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-accent bg-card px-6 rounded-xl border">
            <AccordionTrigger onClick={() => setCurrentStep(2)} className="items-center group hover:no-underline group hover:cursor-pointer">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1 group-hover:underline">Step 2: Paste ChatGPT Response</h2>
                <p className="text-sm font-medium text-muted-foreground">
                  Paste the response from ChatGPT below. Make sure it follows the format:
                  <code className="bg-background/25 border border-background/30 font-semibold px-2 py-1 rounded ml-2 text-foreground/50">
                    &lt;song name&gt; || &lt;artist1, artist2, ...&gt;
                  </code>
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ResponsePaste
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
                onPaste={(text) => {
                  setInputText(text);
                  router.push("/import");
                }}
                pastedText={inputText}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-accent bg-card px-6 rounded-xl border">
            <AccordionTrigger
              onClick={() => setCurrentStep(3)}
              disabled={parsedTracks.length === 0}
              className="items-center group hover:no-underline group hover:cursor-pointer"
            >
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1 group-hover:underline">Step 3: Select Tracks to Search</h2>
                <p className="text-sm font-medium text-muted-foreground">Select the tracks you want to search for in your music database.</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <PasteSelector
                selectedTracks={selectedTracks}
                setSelectedTracks={(tracks) => {
                  router.push("/import");
                  setSelectedTracks(tracks);
                }}
                parsedTracks={parsedTracks}
                onBack={() => setCurrentStep(2)}
                onNext={() => {
                  setCurrentStep(3);
                  router.push(
                    `/import?q=${encodeURIComponent(
                      JSON.stringify(
                        parsedTracks
                          .filter((track, index) => selectedTracks.some((s) => s === index))
                          .map((track) => ({ title: track.title, artists: track.artists }))
                      )
                    )}`
                  );
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-accent bg-card px-6 rounded-xl border">
            <AccordionTrigger
              disabled={parsedTracks.length === 0 || selectedTracks.length === 0}
              onClick={() => setCurrentStep(4)}
              className="items-center group hover:no-underline group hover:cursor-pointer"
            >
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1 group-hover:underline">Step 4: Review Search Results</h2>
                <p className="text-sm font-medium text-muted-foreground">
                  Review the search results and select which tracks you want to save to your collection.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ReviewResponse searchResults={searchResults} onBack={() => setCurrentStep(3)} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
