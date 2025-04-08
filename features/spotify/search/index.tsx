import { FaSpotify } from "react-icons/fa";
import SearchResults from "../components/search-results";
export default function SpotifySearch({ query }: { query: string }) {
  const hasQuery = query.length > 0;

  return (
    <>
      {hasQuery ? (
        <SearchResults query={query} />
      ) : (
        <div className="mt-32">
          {!hasQuery ? (
            // Empty state when no search has been performed
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FaSpotify className="h-16 w-16 text-accent-foreground mb-6" />
              <h3 className="text-2xl font-medium text-card-foreground mb-3">
                Search Spotify
              </h3>
              <p className="text-muted-foreground font-semibold max-w-md mb-6">
                Enter a search term above to find tracks, albums, or artists on
                Spotify.
              </p>
            </div>
          ) : (
            // This would show search results when hasSearched is true
            <div className="space-y-4">
              {/* Search results would go here */}
            </div>
          )}
        </div>
      )}
    </>
  );
}
