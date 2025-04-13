import { fetchSpotifySearch } from "@/app/api";
import { ArtistGrid } from "../components/artist-grid";
import { SearchTabs } from "../components/search-tabs";

export default async function Artists({ query }: { query: string }) {
  const result = await fetchSpotifySearch(query, ["search"]);
  if (!result) return null;
  const { topResult, tracks, albums, playlists, artists } = result;

  return (
    <div className="mt-6">
      <SearchTabs activeTab="artists" query={query} />

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Artists</h2>
        <ArtistGrid artists={artists} />
      </div>
    </div>
  );
}
