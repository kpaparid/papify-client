import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ReviewResponse({ searchResults, onBack }: { searchResults: any[]; onBack: () => void }) {
  const isSearching = false;
  return (
    <section>
      <>
        <div className="bg-background/25 border border-background/30 rounded-md p-2 mb-6 mt-2 max-h-[400px] overflow-y-auto">
          {searchResults.map((result, index) => (
            <div key={index} className="p-3 border-b border-accent last:border-0 flex items-center">
              <div className="flex-shrink-0 mr-5">
                <img src={result.coverUrl || "/placeholder.svg"} alt={result.title} className="w-12 h-12 rounded" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{result.title}</div>
                <div className="text-sm text-muted-foreground font-semibold">{result.artists.join(", ")}</div>
              </div>
              {/* <button
                            onClick={() => toggleSaveStatus(index)}
                            className={`p-2 rounded-full transition-colors ${
                              result.save ? "bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50" : "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50"
                            }`}
                          >
                            {result.save ? <BsCheckCircle size={20} /> : <BsXCircle size={20} />}
                          </button> */}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button onClick={onBack} className="bg-foreground! text-primary hover:brightness-80 cursor-pointer">
            <ArrowLeft /> Back
          </Button>
        </div>
      </>
    </section>
  );
}
