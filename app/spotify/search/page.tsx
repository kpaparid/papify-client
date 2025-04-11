import SpotifySearch from "@/features/spotify/search";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = (await searchParams).q || "";
  return <SpotifySearch query={query} />;
}
