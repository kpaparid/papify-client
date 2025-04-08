import GridList from "@/components/grid-list";
import { SearchAlbumType } from "../types";

export function AlbumGrid({
  albums,
  limit,
}: {
  albums: SearchAlbumType[];
  limit?: number;
}) {
  const displayAlbums = limit ? albums.slice(0, limit) : albums;

  return (
    <GridList
      items={displayAlbums.map((album) => ({
        id: album.id,
        href: `/spotify/albums/${album.id}`,
        image: album.images?.[0],
        name: album.name,
        descriptions: [
          album.artists.map((artist) => artist.name).join(", "),
          album.release_date,
        ],
      }))}
    />
  );
}
