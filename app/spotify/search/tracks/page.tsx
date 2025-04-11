import Tracks from "@/features/spotify/search/tracks";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = (await searchParams)?.q || "";
  return <Tracks query={query} />;
}
