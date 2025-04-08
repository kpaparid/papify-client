import Tracks from "@/features/spotify/search/tracks";

export default function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  return <Tracks query={query} />;
}
