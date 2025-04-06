import Image from "next/image";
import { Play } from "lucide-react";
import { getMockDataForQuery } from "../data";
import { SearchPlaylistType } from "../types";

interface PlaylistGridProps {
  query: string;
  limit?: number;
}

export function PlaylistGrid({
  playlists,
  limit,
}: {
  playlists: SearchPlaylistType[];
  limit?: number;
}) {
  const displayPlaylists = limit ? playlists.slice(0, limit) : playlists;
  console.log(playlists[0]);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {displayPlaylists.map((playlist) => (
        <div key={playlist.id} className="group">
          <div className="relative aspect-square mb-3 rounded-md overflow-hidden shadow-lg group">
            <Image
              src={playlist.images?.[0] || "/placeholder.svg"}
              alt={playlist.name}
              width={200}
              height={200}
              className="object-cover group-hover:opacity-70 transition"
            />
            <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">
              <Play className="h-5 w-5 text-black" fill="black" />
            </button>
          </div>
          <div className="truncate text-center">
            <div className="font-medium truncate">{playlist.name}</div>
            <div className="text-sm text-muted-foreground truncate font-semibold">
              {playlist.total_tracks} tracks
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
