import Spotify from "@/features/spotify";

export default function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  return <Spotify query={query} />;
}
