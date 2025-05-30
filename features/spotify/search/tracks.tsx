import { fetchSpotifySearch } from "@/features/api";
import { SearchTabs } from "../components/search-tabs";
import { TrackList } from "../components/track-list";
import { List } from "../components/track-list-2";

export default async function Tracks({ query }: { query: string }) {
  const result = await fetchSpotifySearch(query, ["search"]);
  if (!result) return null;
  const { topResult, tracks, albums, playlists, artists } = result;
  return (
    <div className="mt-6">
      <SearchTabs activeTab="tracks" query={query} />

      <div className="mt-6">
        <div className="">
          <List
            items={tracks.map((track) => ({
              ...track,
              type: "track",
              hasSave: true,
              youtubeSearchQuery: `id=${track.id}&artists=${track.artists.map((artist) => artist.name).join(",")}&title=${track.name}`,
              image: track.album.images?.[0],
              links: track.artists.map((artist) => ({
                href: `/spotify/artists/${artist.id}`,
                label: artist.name,
              })),
            }))}
          />
        </div>
      </div>
    </div>
  );
}
