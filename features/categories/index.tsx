import Header from "@/components/header"
import Metrics from "@/components/metrics"
import { fetchSavedTracks, fetchCategories } from "@/features/api"
import CategoriesList from "./categories-list"

export default async function Categories() {
  const { data: tracks, date } = await fetchSavedTracks()
  const categories = await fetchCategories()
  const allCategoriesLength = categories.length - 2
  console.log(tracks)
  return (
    <div className='w-full mx-auto max-w-[1320px] space-y-6'>
      <Header
        title='Tracks Categories'
        subtitle='Manage your track categories'
      />
      <Metrics
        metrics={[
          { label: "Total Categories", value: allCategoriesLength },
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
      <CategoriesList tracks={tracks} date={date} categories={categories} />
    </div>
  )
}
