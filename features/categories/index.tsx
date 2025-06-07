import { fetchSavedTracks } from "@/features/api"
import Header from "@/components/header"
import Metrics from "@/components/metrics"
import List from "../google-drive/list"
import { TrackData } from "../track-list/components/track-item"
import { refetchSavedTracks } from "../track-list/actions"
import { deleteCategoryAction } from "./actions"

export default async function Categories() {
  const { data: tracks, date } = await fetchSavedTracks()

  const allCategories = tracks[0]?.allCollectionIds || []
  const tracksByCategory = allCategories.reduce(
    (acc: { [key: string]: TrackData[] }, category) => {
      acc[category] = tracks.filter((track) =>
        track.collectionIds.includes(category)
      )
      return acc
    },
    {
      uncategorized: tracks.filter((track) => track.collectionIds.length === 0),
    }
  )

  const items = Object.keys(tracksByCategory).map((category) => {
    const tracks = tracksByCategory[category]
    return {
      id: category,
      image:
        tracks[Math.floor(Math.random() * tracks.length)]?.spotify.album
          .images[0],
      title: category === "uncategorized" ? "Uncategorized" : category,
      description: `${tracks.length} tracks`,
      href: `/categories/${category}`,
      editHref: `/categories/${category}/edit`,
      editDisabled: category === "uncategorized",
      deleteDisabled: category === "uncategorized",
      deleteAction: deleteCategoryAction,
      meta: {
        tracksLength: tracks.length,
        title: category,
      },
    }
  })
  return (
    <div className='w-full mx-auto max-w-[1320px] space-y-6'>
      <Header
        title='Tracks Categories'
        subtitle='Manage your track categories'
      />
      <Metrics
        metrics={[
          { label: "Total Categories", value: allCategories.length },
          {
            label: "Total Tracks",
            value: tracks.length,
          },
          {
            label: "Not in Categories",
            value: tracks.filter(
              ({ collectionIds }) =>
                typeof collectionIds === "undefined" ||
                collectionIds.length === 0
            ).length,
            badge: `${Math.floor(
              (tracks.filter(
                ({ collectionIds }) =>
                  typeof collectionIds === "undefined" ||
                  collectionIds.length === 0
              ).length *
                100) /
                tracks.length
            )}%`,
          },
        ]}
      />
      <List
        title='Your Track Categories'
        searchPlaceHolder='Search categories...'
        items={items}
        sort={[{ field: "name", label: "Name" }]}
        filters={[{ field: "name", label: "Name" }]}
        date={new Date(date).toISOString()}
        refetch={refetchSavedTracks}
      />
    </div>
  )
}
