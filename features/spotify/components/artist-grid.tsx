import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { SearchArtistType } from "../types";

export function ArtistGrid({
  artists,
  limit,
}: {
  artists: SearchArtistType[];
  limit?: number;
}) {
  const displayArtists = limit ? artists.slice(0, limit) : artists;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {displayArtists.map((artist) => (
        <Link href={`/artist/${artist.id}`} key={artist.id} className="group">
          <div className="relative aspect-square mb-3 rounded-md overflow-hidden shadow-lg group">
            <Image
              src={artist.images?.[0] || "/placeholder.svg"}
              alt={artist.name}
              fill
              className="object-cover group-hover:opacity-70 transition"
            />
            <button className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">
              <Play className="h-5 w-5 text-black" fill="black" />
            </button>
          </div>
          <div className="truncate text-center">
            <div className="font-medium truncate">{artist.name}</div>
            <div className="text-sm text-muted-foreground font-semibold truncate">
              Artist
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
