import { fetchGoogleDriveTracks, fetchYoutubeTracks } from "@/features/api";
import Header from "@/components/header";
import Metrics from "@/components/metrics";
import { Button } from "@/components/ui/button";
import { Check, RefreshCw } from "lucide-react";
import { format, isToday } from "date-fns";
import List from "../google-drive/list";
import { refetchYoutubeTracks, removeYoutubeQueryAction } from "./actions";

export default async function Youtube() {
  const { data: tracks, date } = await fetchYoutubeTracks();
  const items = tracks.map((track) => {
    return {
      id: track._id,
      image: track.images[0],
      title: track.query.split(" - ")[0],
      description: `${track.query.split(" - ")[1]} - ${track.youtubeId} - ${track.spotifyId}`,
      badgeText: typeof track.collectionIds !== "undefined" ? "In Collection" : undefined,
      badgeIcon: <Check />,
      labels: track?.collectionIds?.map((id) => ({ text: id })),
      deleteAction: removeYoutubeQueryAction,
      editHref: `/youtube-search/${track._id}/edit?youtubeId=${track.youtubeId}&q=${track.query}`,
      youtubeId: track.youtubeId,
      meta: {
        isSaved: track.isSaved,
        isNotSaved: !track.isSaved,
        publishDate: new Date(track.publish_date).getTime(),
        title: track.query.split(" - ")[0],
        query: track.query,
        youtubeId: track.youtubeId,
        spotifyId: track.spotifyId,
        collectionIds: track.collectionIds,
      },
    };
  });
  return (
    <div className="w-full mx-auto max-w-[1320px] space-y-6">
      <Header title="Youtube Queries" subtitle="Manage your youtube searches" />
      <Metrics
        metrics={[
          { label: "Total Queries", value: tracks.length },
          {
            label: "In Collections",
            value: tracks.filter(({ collectionIds }) => typeof collectionIds !== "undefined").length,
            badge: `${Math.floor((tracks.filter(({ collectionIds }) => typeof collectionIds !== "undefined").length * 100) / tracks.length)}%`,
          },
          {
            label: "Not in Collections",
            value: tracks.filter(({ collectionIds }) => typeof collectionIds === "undefined").length,
          },
        ]}
      />
      <List
        title="Your Youtube Queries"
        date={new Date(date).toISOString()}
        refetch={refetchYoutubeTracks}
        items={items}
        sort={[
          { field: "title", label: "Title" },
          { field: "query", label: "Query" },
          { field: "isSaved", label: "Saved" },
          { field: "publishDate", label: "Publish Date", type: "date" },
        ]}
        filters={[
          { field: "isSaved", label: "Saved" },
          { field: "isNotSaved", label: "Not Saved" },
        ]}
      />
    </div>
  );
}
