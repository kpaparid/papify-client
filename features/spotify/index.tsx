import Link from "next/link";
import { Music2, Search } from "lucide-react";
import SearchForm from "./components/search-form";
import SearchResults from "./components/search-results";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSpotify } from "react-icons/fa";
export default function Spotify({ query }: { query: string }) {
  const hasQuery = query.length > 0;

  return (
    <div className="w-full mx-auto max-w-7xl space-y-6">
      <Header
        title="Spotify Search"
        subtitle="Search for tracks, artists, albums, or playlists"
      />
      <SearchForm initialQuery={query} />

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
    </div>
  );
}
