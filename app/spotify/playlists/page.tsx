import Playlists from "@/features/spotify/search/playlists";

export default function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  return <Playlists query={query} />;
}
