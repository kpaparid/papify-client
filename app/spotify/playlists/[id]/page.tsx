import { fetchSpotifyAlbum, fetchSpotifyArtist, fetchSpotifyPlaylist } from "@/features/api";
import BackButton from "@/components/back-button";
import { List } from "@/features/spotify/components/track-list-2";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const playlist = await fetchSpotifyPlaylist(id);

  return (
    <div className="w-full mx-auto max-w-[1320px] space-y-6">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="relative flex-shrink-0 shadow-2xl">
            <Image src={playlist.images[0] || "/placeholder.svg"} alt={playlist.name} width={220} height={220} className="rounded-md object-cover" priority />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium bg-[#183D3D] px-2 py-1 rounded-full uppercase mb-3 inline-block w-fit">Playlist</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">{playlist.name}</h1>
            <div className="flex items-center gap-2 mt-4">
              <div className="text-sm">
                <Link href="#" className="font-semibold hover:underline">
                  {playlist.name}
                </Link>
                <div className="text-muted-foreground font-semibold">{playlist.owner.name}</div>
              </div>
            </div>
          </div>
        </div>
        <List
          items={playlist.tracks.map((track) => ({
            id: track.id,
            youtubeSearchQuery: `id=${track.id}&artists=${track.artists.map((artist) => artist.name).join(",")}&title=${track.name}`,
            name: track.name,
            popularity: track.popularity,
            hasSave: true,
            isSaved: track.isSaved,
            image: track.album[0].images[0],
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
