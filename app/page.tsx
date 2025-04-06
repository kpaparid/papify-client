import { fetchSavedTracks } from "./api";
import MusicTrackList from "@/features/track-list";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Metrics from "@/components/metrics";
import Header from "@/components/header";

export default async function Home() {
  const tracks = await fetchSavedTracks();
  const date = new Date().toLocaleTimeString();

  const totalTracks = tracks.length;
  const downloadedTracks = tracks.filter(({ storage }) => !!storage).length;
  const downloadingTracks = tracks.filter(
    ({ downloading }) => downloading
  ).length;

  return (
    <div className="w-full mx-auto max-w-7xl space-y-6">
      <Header title="Music Library" subtitle={`Last updated: ${date}`} />
      <Metrics
        metrics={[
          { label: "Total Tracks", value: totalTracks },
          {
            label: "Downloaded",
            value: downloadedTracks,
            badge: Math.round((downloadedTracks / totalTracks) * 100) + "%",
          },
          { label: "Downloading", value: downloadingTracks },
        ]}
      />
      <MusicTrackList tracks={tracks} />
    </div>
  );
}
