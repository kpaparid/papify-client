import { fetchGoogleDriveTracks, fetchYoutubeTracks } from "@/app/api";
import Header from "@/components/header";
import Metrics from "@/components/metrics";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { format, isToday } from "date-fns";
import {
  refetchGoogleDriveTracks,
  refetchYoutubeTracks,
} from "../google-drive/actions";
import { TrackItem } from "./track-item";

export default async function Youtube() {
  const { data: tracks, date } = await fetchYoutubeTracks();
  console.log("Youtube tracks", tracks);
  return (
    <div className="w-full mx-auto max-w-[1320px] space-y-6">
      <Header title="Youtube Queries" subtitle="Manage your youtube searches" />
      <Metrics
        metrics={[
          { label: "Total Queries", value: tracks.length },
          {
            label: "In Collections",
            value: tracks.filter(
              ({ collectionIds }) => typeof collectionIds !== "undefined"
            ).length,
            badge: `${
              (tracks.filter(
                ({ collectionIds }) => typeof collectionIds !== "undefined"
              ).length *
                100) /
              tracks.length
            }%`,
          },
          {
            label: "Not in Collections",
            value: tracks.filter(
              ({ collectionIds }) => typeof collectionIds === "undefined"
            ).length,
          },
        ]}
      />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Youtube Queries</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Last synced:{" "}
            {`${isToday(new Date()) ? "Today" : format(new Date(), "PPP")} at
            ${format(new Date(), "h:mm a")}`}
          </span>
          <form action={refetchYoutubeTracks}>
            <Button type="submit" variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </form>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {tracks.map((track) => (
          <TrackItem key={track.youtubeId} {...track} />
        ))}
      </div>
    </div>
  );
}
