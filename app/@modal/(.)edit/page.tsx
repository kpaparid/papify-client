import { fetchMoreYoutubeTracks, fetchSavedTracks } from "@/features/api";
import { EditTrackModal } from "@/features/track-list/components/edit-track-modal";
import { notFound } from "next/navigation";

// This is the intercepting modal route
export default async function Page({ searchParams }: { searchParams: { q: string; q2: string } }) {
  const params = await searchParams;
  const { q, q2 } = params;
  const tracks = await fetchMoreYoutubeTracks(q2 || q);
  if (!tracks || tracks.length === 0) return notFound();

  return <EditTrackModal query={q} query2={q2} tracks={tracks} />;
}
