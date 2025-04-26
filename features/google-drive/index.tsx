import { fetchGoogleDriveTracks } from "@/features/api";
import Header from "@/components/header";
import Metrics from "@/components/metrics";
import { Check } from "lucide-react";
import { refetchGoogleDriveTracks, removeGoogleDriveTrackAction } from "./actions";
import List from "./list";

export default async function GoogleDrive() {
  const { data: tracks, date } = await fetchGoogleDriveTracks();
  const items = tracks.map((track) => {
    return {
      id: track.id,
      image: track.appProperties.image,
      title: track.appProperties.name,
      description: `${track.appProperties.artists} - ${track.appProperties.album} - ${track.appProperties.youtubeId} - ${track.appProperties.spotifyId}`,
      badgeText: typeof track.collectionIds !== "undefined" ? "In Collection" : undefined,
      badgeIcon: <Check />,
      labels: track?.collectionIds?.map((id) => ({ text: id })),
      deleteAction: removeGoogleDriveTrackAction,
      meta: {
        isSaved: track.isSaved,
        date: new Date(track.createdTime).getTime(),
        youtubeId: track.appProperties.youtubeId,
        spotifyId: track.appProperties.spotifyId,
        name: track.appProperties.name,
        artists: track.appProperties.artists,
        album: track.appProperties.album,
        collectionIds: track.collectionIds,
      },
    };
  });
  return (
    <div className="w-full mx-auto max-w-[1320px] space-y-6">
      <Header title="Google Drive" subtitle="Manage your cloud tracks" />
      <Metrics
        metrics={[
          { label: "Total Tracks", value: tracks.length },
          {
            label: "In Collections",
            value: tracks.filter(({ collectionIds }) => typeof collectionIds !== "undefined").length,
            badge: `${(tracks.filter(({ collectionIds }) => typeof collectionIds !== "undefined").length * 100) / tracks.length}%`,
          },
          {
            label: "Not in Collections",
            value: tracks.filter(({ collectionIds }) => typeof collectionIds === "undefined").length,
          },
        ]}
      />
      <List
        title="Your Drive Tracks"
        items={items}
        sort={[
          { field: "name", label: "Name" },
          { field: "artists", label: "Artists" },
          { field: "album", label: "Album" },
          { field: "date", label: "Date", type: "date" },
          { field: "isSaved", label: "Saved" },
        ]}
        filters={[
          { field: "isSaved", label: "Saved" },
          { field: "isNotSaved", label: "Not Saved" },
        ]}
        date={new Date(date).toISOString()}
        refetch={refetchGoogleDriveTracks}
      />
    </div>
  );
}
