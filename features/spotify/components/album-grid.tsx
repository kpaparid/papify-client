import Image from "next/image";
import { Play } from "lucide-react";
import { getMockDataForQuery } from "../data";
import { SearchAlbumType } from "../types";

interface AlbumGridProps {
  query: string;
  limit?: number;
}

export function AlbumGrid({
  albums,
  limit,
}: {
  albums: SearchAlbumType[];
  limit?: number;
}) {
  const displayAlbums = limit ? albums.slice(0, limit) : albums;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {displayAlbums.map((album) => (
        <div key={album.id} className="group">
          <div className="relative aspect-square mb-3 rounded-md overflow-hidden shadow-lg group">
            <Image
              src={album.images?.[0] || "/placeholder.svg"}
              alt={album.name}
              width={200}
              height={200}
              className="object-cover group-hover:opacity-70 transition"
            />
            <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">
              <Play className="h-5 w-5 text-black" fill="black" />
            </button>
          </div>
          <div className="truncate text-center">
            <div className="font-medium truncate">{album.name}</div>
            <div className="text-sm text-muted-foreground font-semibold truncate">
              {album.release_date} •{" "}
              {album.artists.map((artist) => artist.name).join(", ")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
