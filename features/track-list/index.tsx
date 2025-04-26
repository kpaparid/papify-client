"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { formatDate, formatDistanceToNow } from "date-fns"
import { ExternalLink, Pause, Pencil, Play, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import YouTube from "react-youtube"
import List, { ListItem } from "../google-drive/list"
import { deleteSpotifyTrackAction, refetchSavedTracks } from "./actions"
import { type TrackData } from "./components/track-item"

export default function MusicTrackList({
  tracks,
  date,
}: {
  tracks: TrackData[]
  date: number
}) {
  const items = tracks.map((track) => {
    return {
      id: track.id,
      image: track.spotify.album.images[0],
      title: track.spotify.name,
      editHref: "/edit?q=" + track.youtube[0].query,
      deleteAction: deleteSpotifyTrackAction,
      description: track.spotify.artists
        .map((artist) => artist.name)
        .join(", "),
      labels: track?.allCollectionIds?.map((id) => ({
        text: id,
        label: id,
        isActive: track.collectionIds.includes(id),
        onClick: () => null,
      })),
      youtubeId: track.youtube[0].youtubeId,
      meta: {
        ...track,
        name: track.spotify.name,
        artists: track.spotify.artists || track.spotify.album.artists,
        album: track.spotify.album,
        downloaded: !!track.storage,
        youtubeId: track.youtube[0].youtubeId,
        spotifyId: track.spotify.spotifyId,
        storageId: track.storage?.storageId,
        query: track.youtube[0].query,
        title: track.youtube[0].title,
        date: track.spotify.album.release_date,
        ...track.collectionIds.map((id) => ({ [id]: true })),
      } as unknown as ListItem["meta"],
    }
  })
  return (
    <List
      title='Your Drive Tracks'
      items={items}
      multiView
      defaultView='card'
      sort={[
        { field: "name", label: "Name" },
        { field: "artists", label: "Artists" },
        { field: "album", label: "Album" },
        { field: "date", label: "Date" },
        { field: "downloaded", label: "Downloaded" },
      ]}
      filters={[
        { field: "downloading", label: "Downloading" },
        { field: "downloaded", label: "Downloaded" },
        ...tracks[0].allCollectionIds.map((id) => ({ field: id, label: id })),
      ]}
      date={new Date(date).toISOString()}
      refetch={refetchSavedTracks}
      renderCardItem={(item) => <CardItem {...item} />}
    />
  )
}

function CardItem(item: ListItem) {
  const [showYoutubePlayer, setShowYoutubePlayer] = useState(false)
  const toggleYoutubePlayer = () => {
    setShowYoutubePlayer(!showYoutubePlayer)
  }
  const meta = item.meta as unknown as TrackData
  const onDeleteAction =
    item.deleteAction && item.deleteAction.bind(null, item.id)
  return (
    <Card
      key={item.id}
      className='group overflow-hidden relative p-8 border border-primary'
    >
      <div className='flex items-center gap-4 absolute right-3 top-4'>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1'>
            {item.editHref && (
              <Link
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 size-9 cursor-pointer h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground hover:bg-accent"
                href={item.editHref}
              >
                <Pencil className='h-4 w-4' />
              </Link>
            )}
            {item.deleteAction && (
              <form action={onDeleteAction}>
                <Button
                  type='submit'
                  variant='ghost'
                  size='icon'
                  className='cursor-pointer h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400 hover:bg-red-400/10'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      <CardContent className='p-0 font-semibold'>
        <div className='flex flex-col items-center md:flex-row'>
          <div className='relative size-52'>
            <div
              className='relative h-full w-full cursor-pointer group'
              onClick={toggleYoutubePlayer}
            >
              <Image
                loading='lazy'
                src={
                  item.image ||
                  "/placeholder.svg?height=300&width=300" ||
                  "/placeholder.svg"
                }
                alt={item.title}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                className='object-cover rounded-md'
              />
              <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md'>
                {showYoutubePlayer ? (
                  <Pause className='h-12 w-12 text-white' />
                ) : (
                  <Play className='h-12 w-12 text-white' />
                )}
              </div>
            </div>
          </div>

          {/* Track Details */}
          <div className='pl-8 flex-1'>
            <div className='flex flex-col gap-0 w-full'>
              <h2 className='text-xl font-semibold'>{meta.spotify.name}</h2>
              <div>
                <div className='flex items-center gap-2'>
                  {meta.spotify.artists.map((artist, index) => (
                    <span key={artist._id} className='text-muted-foreground'>
                      {artist.name}
                      {index < meta.spotify.artists.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
                <div className='grid grid-cols-2 space-x-6'>
                  <div className='text-sm text-muted-foreground'>
                    Album: {meta.spotify.album.name}{" "}
                    {`(${new Date(
                      meta.spotify.album.release_date
                    ).getFullYear()})`}
                  </div>
                </div>
              </div>
            </div>

            <Separator className='my-2.5' />

            <div className='grid grid-cols-1 md:grid-cols-2 space-x-6'>
              <div>
                <h3 className='text-sm font-medium'>Storage</h3>
                {meta.storage ? (
                  <div className='text-sm text-muted-foreground mt-0.5'>
                    <div>File: {meta.storage.name}</div>
                    <div>
                      Added:{" "}
                      {formatDistanceToNow(new Date(meta.storage.createdTime), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className='text-sm text-muted-foreground mt-0.5'>
                      <div>File: Not downloaded yet</div>
                      <div>
                        Downloading:{" "}
                        <span className='capitalize'>
                          {meta.downloading.toString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {meta.youtube.length > 0 && (
                <div>
                  <h3 className='text-sm font-medium flex items-center gap-2'>
                    YouTube
                    <a
                      href={`https://www.youtube.com/watch?v=${meta.youtube[0].youtubeId}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center'
                    >
                      <ExternalLink className='h-3 w-3' />
                    </a>
                  </h3>
                  <div className='text-sm text-muted-foreground mt-0.5 line-clamp-1'>
                    {meta.youtube[0].title}
                  </div>
                  <div className='text-sm text-muted-foreground line-clamp-2'>
                    {formatDate(meta.youtube[0].publish_date, "dd.MM.yyyy")}
                  </div>
                </div>
              )}
            </div>
            <div className='mt-3'>
              <h3 className='text-sm font-medium'>Collections</h3>
              <div className='flex gap-1 mt-0.5'>
                {meta.allCollectionIds.length === 0 ? (
                  <div className='text-sm text-muted-foreground'>
                    No collections added yet
                  </div>
                ) : (
                  <div className='mt-1 flex gap-1 flex-wrap'>
                    {meta.allCollectionIds.map((collection, index) => (
                      <Badge asChild key={`${collection}-${index}`}>
                        <Button
                          className={cn(
                            "text-accent-foreground h-auto cursor-pointer",
                            meta.collectionIds.includes(collection)
                              ? "bg-[#183D3D] hover:brightness-75"
                              : "bg-accent/75 opacity-50 hover:opacity-100"
                          )}
                        >
                          {collection}
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Player */}
        {showYoutubePlayer && meta.youtube && meta.youtube.length > 0 && (
          <div className='mt-4 rounded-md overflow-hidden'>
            <YouTube
              videoId={meta.youtube[0].youtubeId}
              opts={{
                width: "100%",
                height: "300",
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                },
              }}
              onEnd={() => setShowYoutubePlayer(false)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
