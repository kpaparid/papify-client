import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { SearchArtistType } from "../types";
import GridList from "@/components/grid-list";

export function ArtistGrid({
  artists,
  limit,
}: {
  artists: SearchArtistType[];
  limit?: number;
}) {
  const displayArtists = limit ? artists.slice(0, limit) : artists;
  return (
    <GridList
      items={displayArtists.map((artist) => ({
        id: artist.id,
        href: `/spotify/artists/${artist.id}`,
        image: artist.images?.[0],
        name: artist.name,
      }))}
    />
  );
}
