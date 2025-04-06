import Link from "next/link";
import { Search } from "lucide-react";
import SearchForm from "./components/search-form";
import { SearchTabs } from "./components/search-tabs";
import { PlaylistGrid } from "./components/playlist-grid";

export default function Playlists({ query }: { query: string }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black p-6 border-r border-neutral-800">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Spotify</h1>
        </div>
        <nav className="space-y-6">
          <div className="space-y-3">
            <Link
              href="/"
              className="flex items-center gap-4 text-white hover:text-green-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-home"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-4 text-green-400 font-bold"
            >
              <Search className="h-6 w-6" />
              Search
            </Link>
            <Link
              href="/library"
              className="flex items-center gap-4 text-white hover:text-green-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-library"
              >
                <rect width="8" height="16" x="3" y="4" rx="1" />
                <path d="m21 4-9 4v12l9-4V4z" />
              </svg>
              Your Library
            </Link>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <SearchForm initialQuery={query} />

          <div className="mt-6">
            <SearchTabs activeTab="playlists" query={query} />

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Playlists</h2>
              <PlaylistGrid query={query} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
