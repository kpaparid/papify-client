import { fetchSpotifyAlbum } from "@/app/api"
import Header from "@/components/header"
import { List } from "@/features/spotify/components/track-list-2"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params
  const album = await fetchSpotifyAlbum(id)
  console.log(album)
  return (
    <div className='w-full mx-auto max-w-7xl space-y-6'>
      <Header
        title='Album'
        subtitle='Search for tracks, artists, albums, or playlists'
        hasBack
      />
      <List
        items={album.tracks.map((track) => ({
          id: track.id,
          href: `/spotify/tracks/${track.id}`,
          image: album.images?.[0],
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
  )
  // const query = searchParams.q || "";
  // return <Albums query={query} />;
}
