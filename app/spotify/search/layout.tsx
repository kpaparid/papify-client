import Header from "@/components/header";
import SearchForm from "@/features/spotify/components/search-form";

export default async function Layout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { q: string };
}) {
  return (
    <div className="w-full mx-auto max-w-[1320px] space-y-6">
      <Header
        title="Spotify Search"
        subtitle="Search for tracks, artists, albums, or playlists"
      />
      <SearchForm />
      <>{children}</>
    </div>
  );
}
