import Link from "next/link";

interface SearchTabsProps {
  activeTab: "all" | "tracks" | "albums" | "playlists" | "artists";
  query: string;
}

export function SearchTabs({ activeTab, query }: SearchTabsProps) {
  const tabs = [
    {
      id: "all",
      label: "All",
      href: `/spotify/search?q=${encodeURIComponent(query)}`,
    },
    {
      id: "tracks",
      label: "Tracks",
      href: `/spotify/search/tracks?q=${encodeURIComponent(query)}`,
    },
    {
      id: "artists",
      label: "Artists",
      href: `/spotify/search/artists?q=${encodeURIComponent(query)}`,
    },
    {
      id: "albums",
      label: "Albums",
      href: `/spotify/search/albums?q=${encodeURIComponent(query)}`,
    },
    {
      id: "playlists",
      label: "Playlists",
      href: `/spotify/search/playlists?q=${encodeURIComponent(query)}`,
    },
  ];

  return (
    <div className="border-b border-card-foreground/10">
      <nav className="flex space-x-4">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={`px-3 py-2 text-sm font-medium ${
              activeTab === tab.id
                ? "text-card-foreground border-b-2 border-card-foreground"
                : "text-muted-foreground hover:text-card-foreground hover:border-b-2 hover:border-card-foreground"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
