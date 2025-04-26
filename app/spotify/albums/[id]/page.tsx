import { fetchSpotifyAlbum } from "@/features/api";
import BackButton from "@/components/back-button";
import { List } from "@/features/spotify/components/track-list-2";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const album = await fetchSpotifyAlbum(id);
  const totalDuration = album.tracks.reduce((acc, track) => acc + track.duration_ms, 0);
  const totalHours = Math.floor(totalDuration / 3600000);
  const totalMinutes = Math.floor((totalDuration % 3600000) / 60000);

  return (
    <div className="w-full mx-auto max-w-[1320px] space-y-6">
      <div className="container mx-auto px-4 py-8">
        <BackButton />

        {/* Album header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="relative flex-shrink-0 shadow-2xl">
            <Image src={album.images[0] || "/placeholder.svg"} alt={album.name} width={200} height={200} className="rounded-md object-cover" priority />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium bg-[#183D3D] px-2 py-1 rounded-full uppercase mb-3 inline-block w-fit">Album</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{album.name}</h1>
            <div className="flex items-center gap-2 mt-4">
              <div className="text-sm">
                {album.artists.map((artist, index) => (
                  <Fragment key={`artist-${index}`}>
                    <Link href={`/spotify/artists/${artist.id}`} className="font-semibold hover:underline">
                      {artist.name}
                    </Link>
                    {index === album.artists.length - 1 ? "" : ", "}
                  </Fragment>
                ))}
                <div className="text-muted-foreground font-semibold">
                  {new Date(album.release_date).getFullYear()} • {album.tracks.length} songs • {totalHours > 0 ? `${totalHours} hr ` : ""}
                  {totalMinutes} min
                </div>
              </div>
            </div>
          </div>
        </div>
        <List
          items={album.tracks.map((track) => ({
            id: track.id,
            href: `/spotify/tracks/${track.id}`,
            name: track.name,
            hasSave: true,
            isSaved: track.isSaved,
            duration: track.duration_ms,
            links: track.artists.map((artist) => ({
              label: artist.name,
              href: `/spotify/artists/${artist.id}`,
            })),
          }))}
        />
      </div>
    </div>
  );
}
