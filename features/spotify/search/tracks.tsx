import { fetchSpotifySearch } from "@/app/api";
import { SearchTabs } from "../components/search-tabs";
import { TrackList } from "../components/track-list";
import { List } from "../components/track-list-2";

export default async function Tracks({ query }: { query: string }) {
  const result = await fetchSpotifySearch(query);
  if (!result) return null;
  const { topResult, tracks, albums, playlists, artists } = result;
  console.log(tracks);
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
              image: track.album.images[0],
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
