import Artists from "@/features/spotify/search/artists";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = (await searchParams?.q) || "";
  return <Artists query={query} />;
}
