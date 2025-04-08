import Image from "next/image";
import { Play } from "lucide-react";
import { SearchTrackType } from "../types";
import Link from "next/link";

interface TrackListProps {
  query: string;
  limit?: number;
}

export function TrackList({
  tracks,
  limit,
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
          className="grid grid-cols-[16px_4fr_3fr] gap-4 p-2 px-4 rounded-md hover:bg-card group"
        >
          <div className="flex items-center justify-center text-muted-foreground font-semibold group-hover:text-white">
            <span className="group-hover:hidden font-semibold">
              {index + 1}
            </span>
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
                {track.artists.map((artist, index) => (
                  <>
                    <Link
                      className="hover:underline hover:text-foreground"
                      key={artist.id}
                      href={`/spotify/artists/${artist.id}`}
                    >
                      {artist.name}
                    </Link>
                    {track.artists.length - 1 !== index && ", "}
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end text-sm text-muted-foreground font-semibold ms-auto">
            {/* {track.popularity} */}
            <div className="w-full min-w-32 max-w-xs mb-4">
              <div className="flex flex-row justify-between text-xs text-muted-foreground font-semibold mb-1">
                <span>Popularity</span>
                <span>{track.popularity}%</span>
              </div>
              <div className="h-1.5 bg-card rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full"
                  style={{ width: `${track.popularity}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
