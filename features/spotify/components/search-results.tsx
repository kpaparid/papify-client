import Link from "next/link";
import { SearchTabs } from "./search-tabs";
import { TopResult } from "./top-result";
import { TrackList } from "./track-list";
import { AlbumGrid } from "./album-grid";
import { PlaylistGrid } from "./playlist-grid";
import { fetchSpotifySearch } from "@/features/api";
import { ArtistGrid } from "./artist-grid";

interface SearchResultsProps {
  query: string;
}

export default async function SearchResults({ query }: SearchResultsProps) {
  const result = await fetchSpotifySearch(query, ["search"]);
  if (!result) return null;
  const { topResult, tracks, albums, playlists, artists } = result;
  return (
    <div className="mt-6">
      <SearchTabs activeTab="all" query={query} />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Top result</h2>
          <TopResult topResult={topResult} />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4">Tracks</h2>
            <Link
              href={`/spotify/search/tracks?q=${encodeURIComponent(query)}`}
              className="text-sm text-muted-foreground font-semibold hover:text-white transition"
            >
              Show all
            </Link>
          </div>
          <TrackList tracks={tracks} limit={4} />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Artists</h2>
          <Link
            href={`/spotify/search/artists?q=${encodeURIComponent(query)}`}
            className="text-sm text-muted-foreground font-semibold hover:text-white transition"
          >
            Show all
          </Link>
        </div>
        <ArtistGrid artists={artists} limit={6} />
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Albums</h2>
          <Link
            href={`/spotify/search/albums?q=${encodeURIComponent(query)}`}
            className="text-sm text-muted-foreground font-semibold hover:text-white transition"
          >
            Show all
          </Link>
        </div>
        <AlbumGrid albums={albums} limit={6} />
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Playlists</h2>
          <Link
            href={`/spotify/search/playlists?q=${encodeURIComponent(query)}`}
            className="text-sm text-muted-foreground font-semibold hover:text-white transition"
          >
            Show all
          </Link>
        </div>
        <PlaylistGrid playlists={playlists} limit={6} />
      </div>
    </div>
  );
}
