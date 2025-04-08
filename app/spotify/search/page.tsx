import SpotifySearch from "@/features/spotify/search";

export default function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  return <SpotifySearch query={query} />;
}
