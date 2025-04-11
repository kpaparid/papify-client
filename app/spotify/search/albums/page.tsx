import Albums from "@/features/spotify/search/albums";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = (await searchParams)?.q || "";
  return <Albums query={query} />;
}
