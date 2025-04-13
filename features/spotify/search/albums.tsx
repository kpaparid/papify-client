import { fetchSpotifySearch } from "@/app/api";
import { SearchTabs } from "../components/search-tabs";
import { AlbumGrid } from "../components/album-grid";

export default async function Albums({ query }: { query: string }) {
  const result = await fetchSpotifySearch(query, ["search"]);
  if (!result) return null;
  const { topResult, tracks, albums, playlists, artists } = result;

  return (
    <div className="mt-6">
      <SearchTabs activeTab="albums" query={query} />

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <AlbumGrid albums={albums} />
      </div>
    </div>
  );
}
