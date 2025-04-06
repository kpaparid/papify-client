import { fetchSavedTracks } from "@/app/api";
import { EditTrackModal } from "@/features/track-list/components/edit-track-modal";
import { notFound } from "next/navigation";

// This is the intercepting modal route
export default async function Page({ params }: { params: { id: string } }) {
  const tracks = await fetchSavedTracks();
  const track = tracks.find((track) => track._id === params.id);

  if (!track) {
    notFound();
  }

  return <EditTrackModal track={track} />;
}
