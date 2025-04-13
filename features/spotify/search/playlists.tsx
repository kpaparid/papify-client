import { fetchSpotifySearch } from "@/app/api";
import { PlaylistGrid } from "../components/playlist-grid";
import { SearchTabs } from "../components/search-tabs";

export default async function Playlists({ query }: { query: string }) {
  const result = await fetchSpotifySearch(query, ["search"]);
  if (!result) return null;
  const { topResult, tracks, albums, playlists, artists } = result;
  return (
    <div className="mt-6">
      <SearchTabs activeTab="playlists" query={query} />

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Playlists</h2>
        <PlaylistGrid playlists={playlists} />
      </div>
    </div>
  );
}
