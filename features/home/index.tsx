import MusicTrackList from "@/features/track-list";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Metrics from "@/components/metrics";
import Header from "@/components/header";
import { fetchSavedTracks } from "@/features/api";

export default async function Home() {
  const { data: tracks, date } = await fetchSavedTracks();

  const totalTracks = tracks.length;
  const downloadedTracks = tracks.filter(({ storage }) => !!storage).length;
  const downloadingTracks = tracks.filter(({ downloading }) => downloading).length;

  return (
    <div className="w-full mx-auto max-w-[1320px] space-y-6">
      <Header title="Music Library" subtitle={`Manage your saved tracks`} />
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
      <MusicTrackList tracks={tracks} date={date} />
    </div>
  );
}
