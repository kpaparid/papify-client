import Tracks from "@/features/spotify/tracks";

export default function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  return <Tracks query={query} />;
}
