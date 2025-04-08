import Albums from "@/features/spotify/albums";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  console.log(id);
  return <div>Albums</div>;
  // const query = searchParams.q || "";
  // return <Albums query={query} />;
}
