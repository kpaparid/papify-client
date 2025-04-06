import { fetchGoogleDriveTracks } from "@/app/api"
import Header from "@/components/header"
import Metrics from "@/components/metrics"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { refetchGoogleDriveTracks } from "./actions"
import { TrackItem } from "./track-item"
import { format, isToday } from "date-fns"

export default async function GoogleDrive() {
  const { data: tracks, date } = await fetchGoogleDriveTracks()
  return (
    <div className='w-full mx-auto max-w-7xl space-y-6'>
      <Header title='Google Drive' subtitle='Manage your cloud tracks' />
      <Metrics
        metrics={[
          { label: "Total Tracks", value: 124 },
          { label: "In Collections", value: 32, badge: "93%" },
          { label: "Not in Collections", value: 92 },
        ]}
      />

      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Your Drive Tracks</h2>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>
            Last synced:{" "}
            {`${isToday(new Date()) ? "Today" : format(new Date(), "PPP")} at
            ${format(new Date(), "h:mm a")}`}
          </span>
          <form action={refetchGoogleDriveTracks}>
            <Button type='submit' variant='outline' size='sm' className='gap-2'>
              <RefreshCw className='h-3.5 w-3.5' />
              Refresh
            </Button>
          </form>
        </div>
      </div>

      <div className='space-y-3 mb-6'>
        {tracks.map((track) => (
          <TrackItem key={track.id} {...track} />
        ))}
      </div>
    </div>
  )
}
