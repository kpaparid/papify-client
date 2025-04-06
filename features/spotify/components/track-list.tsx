import Image from "next/image";
import { Play } from "lucide-react";
import { getMockDataForQuery } from "../data";
import { SearchTrackType } from "../types";

interface TrackListProps {
  query: string;
  limit?: number;
}

export function TrackList({
  tracks,
  limit = 4,
}: {
  tracks: SearchTrackType[];
  limit?: number;
}) {
  const displayTracks = limit ? tracks.slice(0, limit) : tracks;

  return (
    <div className="space-y-1">
      {displayTracks.map((track, index) => (
        <div
          key={track.id}
          className="grid grid-cols-[16px_4fr_3fr] gap-4 p-2 px-4 rounded-md hover:bg-neutral-800 group"
        >
          <div className="flex items-center justify-center text-muted-foreground font-semibold group-hover:text-white">
            <span className="group-hover:hidden">{index + 1}</span>
            <Play className="h-4 w-4 hidden group-hover:block" />
          </div>
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src={track.album.images?.[0] || "/placeholder.svg"}
                alt={track.album.id}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="truncate">
              <div className="truncate font-medium">{track.name}</div>
              <div className="text-sm text-muted-foreground font-semibold truncate">
                {track.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end text-sm text-muted-foreground font-semibold ms-auto">
            {track.popularity}
          </div>
        </div>
      ))}
    </div>
  );
}
