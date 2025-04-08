import { fetchSpotifySearch } from "@/app/api";
import { SearchTabs } from "../components/search-tabs";
import { TrackList } from "../components/track-list";

export default async function Tracks({ query }: { query: string }) {
  const result = await fetchSpotifySearch(query);
  if (!result) return null;
  const { topResult, tracks, albums, playlists, artists } = result;
  return (
    <div className="mt-6">
      <SearchTabs activeTab="tracks" query={query} />

      <div className="mt-6">
        <div className="">
          <TrackList tracks={tracks} />
        </div>
      </div>
    </div>
  );
}
