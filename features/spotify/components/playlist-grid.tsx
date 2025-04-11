import Image from "next/image";
import Link from "next/link";
import { SearchPlaylistType } from "../types";
import GridList from "@/components/grid-list";

export function PlaylistGrid({
  playlists,
  limit,
}: {
  playlists: SearchPlaylistType[];
  limit?: number;
}) {
  const displayPlaylists = limit ? playlists.slice(0, limit) : playlists;
  console.log(displayPlaylists);
  return (
    <GridList
      items={displayPlaylists.map((playlist) => ({
        id: playlist.id,
        href: `/spotify/playlists/${playlist.id}`,
        image: playlist.images?.[0],
        name: playlist.name,
        descriptions: [`${playlist.total_tracks} tracks`],
      }))}
    />
  );
}
