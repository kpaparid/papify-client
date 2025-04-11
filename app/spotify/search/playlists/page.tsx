import Playlists from "@/features/spotify/search/playlists";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = (await searchParams)?.q || "";
  return <Playlists query={query} />;
}
