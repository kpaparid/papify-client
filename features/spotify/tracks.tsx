import Link from "next/link";
import { Search, Clock } from "lucide-react";
import SearchForm from "./components/search-form";
import { SearchTabs } from "./components/search-tabs";
import { TrackList } from "./components/track-list";
import { fetchSpotifySearch } from "@/app/api";

export default async function Tracks({ query }: { query: string }) {
  const result = await fetchSpotifySearch(query);
  if (!result) return null;
  const { topResult, tracks, albums, playlists, artists } = result;
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <SearchForm initialQuery={query} />

          <div className="mt-6">
            <SearchTabs activeTab="tracks" query={query} />

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Songs</h2>

              <div className="bg-neutral-900 rounded-md overflow-hidden">
                <div className="grid grid-cols-[16px_4fr_3fr_1fr] gap-4 px-4 py-2 text-sm text-muted-foreground font-semibold border-b border-neutral-800">
                  <div className="text-center">#</div>
                  <div>TITLE</div>
                  <div>ALBUM</div>
                  <div className="flex justify-end">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>

                <TrackList tracks={tracks} limit={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
