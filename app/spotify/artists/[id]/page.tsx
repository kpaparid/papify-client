import { fetchSpotifyArtist } from "@/app/api";
import BackButton from "@/components/back-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List } from "@/features/spotify/components/track-list-2";
import Image from "next/image";
function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M followers`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K followers`;
  }
  return `${count} followers`;
}
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { artist, playlists, tracks, albums } = await fetchSpotifyArtist(id);

  return (
    <div className="w-full mx-auto max-w-[1320px] space-y-6">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="relative flex-shrink-0 shadow-2xl">
            <Image
              src={artist.images[0] || "/placeholder.svg"}
              alt={artist.id}
              width={220}
              height={220}
              className="rounded-md object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium bg-[#183D3D] px-2 py-1 rounded-full uppercase mb-3 inline-block w-fit">
              Artist
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              {artist.name}
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <div className="text-sm">
                <div className="text-muted-foreground font-semibold">
                  {formatFollowers(artist.followers)}
                </div>
                <div className="text-muted-foreground font-semibold capitalize">
                  {artist.genres.join(", ")}
                </div>
                <div className="mt-4">
                  <div className="w-full min-w-80">
                    <div className="flex flex-row justify-between text-sm text-foreground/75 font-semibold mb-1">
                      <span>Popularity</span>
                      <span>{artist.popularity}%</span>
                    </div>
                    <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-foreground rounded-full"
                        style={{ width: `${artist.popularity}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="bg-accent/40 gap-3">
            <TabsTrigger
              className="cursor-pointer hover:brightness-110"
              value="tracks"
            >
              Tracks
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer hover:brightness-110"
              value="albums"
            >
              Albums
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer hover:brightness-110"
              value="playlists"
            >
              Playlists
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tracks">
            <List
              items={tracks.map((track) => ({
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
          </TabsContent>
          <TabsContent value="albums">
            <List
              items={albums.map((album) => ({
                id: album.id,
                href: `/spotify/albums/${album.id}`,
                name: album.name,
                image: album.images[0],
                popularity: album.popularity,
                rightText: `${album.total_tracks} tracks`,
                links: album.artists.map((artist) => ({
                  label: artist.name,
                  href: `/spotify/artists/${artist.id}`,
                })),
              }))}
            />
          </TabsContent>
          <TabsContent value="playlists">
            <List
              items={playlists.map((playlist) => ({
                id: playlist.id,
                href: `/spotify/playlists/${playlist.id}`,
                image: playlist.images[0],
                name: playlist.name,
                rightText: `${playlist.total_tracks} tracks`,
                description: playlist.description,
              }))}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
