import { fetchMoreYoutubeTracks, fetchSavedTracks } from "@/features/api";
import { EditTrackModal } from "@/features/track-list/components/edit-track-modal";
import { notFound } from "next/navigation";

export default async function Page({ params, searchParams }: { params: { searchId: string }; searchParams: { q: string; q2: string; youtubeId: string } }) {
  const p = await params;
  const sp = await searchParams;
  const { q, q2, youtubeId } = sp;
  const tracks = await fetchMoreYoutubeTracks(q2 || q);
  if (!tracks || tracks.length === 0) return notFound();

  return <EditTrackModal youtubeId={youtubeId} searchId={p.searchId} query={q} query2={q2} tracks={tracks} />;
}
