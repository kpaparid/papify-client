import Header from "@/components/header";
import SearchForm from "@/features/spotify/components/search-form";

export default async function Layout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { q: string };
}) {
  const query = (await searchParams?.q) || "";
  return (
    <div className="w-full mx-auto max-w-7xl space-y-6">
      <Header
        title="Spotify Search"
        subtitle="Search for tracks, artists, albums, or playlists"
      />
      <SearchForm />
      <>{children}</>
    </div>
  );
}
