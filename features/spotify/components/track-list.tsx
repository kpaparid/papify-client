import Image from "next/image";
import { Play } from "lucide-react";
import { SearchTrackType } from "../types";
import Link from "next/link";
import { Fragment } from "react";
import SaveTrackButton from "@/components/save-track-button";
import { List } from "./track-list-2";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TrackListProps {
  query: string;
  limit?: number;
}

export function TrackList({ tracks, limit }: { tracks: SearchTrackType[]; limit?: number }) {
  const displayTracks = limit ? tracks.slice(0, limit) : tracks;
  return (
    <ScrollArea className="h-[250px]">
      <div>
        <List
          youtubeHeight="170"
          items={displayTracks.map((track) => ({
            ...track,
            type: "track",
            hasSave: true,
            youtubeSearchQuery: `id=${track.id}&artists=${track.artists.map((artist) => artist.name).join(",")}&title=${track.name}`,
            image: track.album.images[0],
            links: track.artists.map((artist) => ({
              href: `/spotify/artists/${artist.id}`,
              label: artist.name,
            })),
          }))}
        />
      </div>
    </ScrollArea>
  );
}
