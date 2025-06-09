"use client"
import { BsQuestion } from "react-icons/bs"
import List, { ListItem } from "../google-drive/list"
import {
  deleteSpotifyTrackAction,
  refetchSavedTracks,
} from "../track-list/actions"
import { deleteAllTracksAction, deleteCategoryAction } from "./actions"
import { TrackData } from "../track-list/components/track-item"

export default function CategoriesList({
  tracks,
  date,
  categories,
}: {
  tracks: TrackData[]
  date: number
  categories: { name: string; tracks: unknown[] }[]
}) {
  const mappedTracks: ListItem[] = tracks.map((track) => ({
    id: track.id,
    image: track.spotify.album.images[0],
    title: track.spotify.name,
    editHref: `/youtube-search/${track.youtube[0]?._id}/edit?youtubeId=${track.youtube[0]?.youtubeId}&q=${track.youtube[0]?.query}`,
    deleteAction: deleteSpotifyTrackAction,
    description: track.spotify.artists.map((artist) => artist.name).join(", "),
    labels: track?.allCollectionIds?.map((id) => ({
      text: id,
      label: id,
      isActive: track.collectionIds.includes(id),
      onClick: () => null,
    })),
    youtubeId: track.youtube[0]?.youtubeId,
    meta: {
      ...track,
      name: track.spotify.name,
      artists: track.spotify.artists || track.spotify.album.artists,
      album: track.spotify.album,
      downloaded: !!track.storage,
      youtubeId: track.youtube[0]?.youtubeId,
      spotifyId: track.spotify.spotifyId,
      storageId: track.storage?.storageId,
      query: track.youtube[0]?.query,
      title: track.youtube[0]?.title,
      date: track.spotify.album.release_date,
      ...track.collectionIds.map((id) => ({ [id]: true })),
    } as unknown as ListItem["meta"],
  }))

  const allCategories = categories.map((category) => category.name)
  const tracksByCategory = allCategories
    .filter((category) => category !== "All" && category !== "Uncategorized")
    .reduce(
      (acc: { [key: string]: ListItem[] }, category: string) => {
        acc[category] = mappedTracks.filter(
          (track) =>
            Array.isArray(track.meta?.collectionIds) &&
            track.meta?.collectionIds?.includes?.(category)
        )
        return acc
      },
      {
        All: mappedTracks,
        Uncategorized: mappedTracks.filter(
          (track) =>
            Array.isArray(track.meta?.collectionIds) &&
            track.meta?.collectionIds?.length === 0
        ),
      }
    )
  const items = Object.keys(tracksByCategory).map((category) => {
    const tracks = tracksByCategory[category]
    return {
      id: category,
      image: tracks[0]?.image || null,
      iconPlaceholder: <BsQuestion />,
      title: category,
      description: `${tracks.length} tracks`,
      // href: `/categories/${category}`,
      editHref: `/categories/${category}/edit`,
      editDisabled: category === "Uncategorized" || category === "All",
      deleteDisabled: category === "Uncategorized" || category === "All",
      deleteAction: deleteCategoryAction,
      meta: {
        tracksLength: tracks.length,
        title: category,
      },
    }
  })
  const tabs = [
    {
      value: "categories",
      label: "Categories",
      items: items,
    },
    ...allCategories.map((category) => {
      const items = tracksByCategory[category]
      return {
        value: category,
        label: category,
        disabled: items.length === 0,
        items,
      }
    }),
  ]
  return (
    <List
      title='Your Track Categories'
      searchPlaceHolder='Search categories...'
      tabs={tabs}
      addHref='/categories/add'
      deleteAction={deleteAllTracksAction}
      sort={[{ field: "title", label: "Name" }]}
      date={new Date(date).toISOString()}
      refetch={refetchSavedTracks}
    />
  )
}
