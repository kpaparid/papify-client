import Albums from "@/features/spotify/albums";

export default function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  return <Albums query={query} />;
}
