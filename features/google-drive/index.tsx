import { fetchGoogleDriveTracks } from "@/app/api";
import Header from "@/components/header";
import Metrics from "@/components/metrics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check, Plus, RefreshCw, Trash2 } from "lucide-react";
import Image from "next/image";

export default async function GoogleDrive() {
  const tracks = await fetchGoogleDriveTracks();
  return (
    <div className="w-full mx-auto max-w-7xl space-y-6">
      <Header title="Google Drive" subtitle="Manage your cloud tracks" />
      <Metrics
        metrics={[
          { label: "Total Tracks", value: 124 },
          { label: "In Collections", value: 32, badge: "93%" },
          { label: "Not in Collections", value: 92 },
        ]}
      />

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Drive Tracks</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Last synced: Today at 7:45 PM
          </span>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {tracks.map((track) => (
          <TrackItem
            key={track.id}
            {...track}
            title={track.spotify.name}
            artist={track.spotify.artists[0]?.name}
            image={track.spotify.album.images[0]}
            collectionIds={["all"]}
          />
        ))}
      </div>
    </div>
  );
}

interface TrackItemProps {
  title: string;
  artist: string;
  image: string;
  collectionIds: string[];
}

function TrackItem({ title, artist, image, collectionIds }: TrackItemProps) {
  return (
    <div className="group relative rounded-xl bg-card p-3 transition-all hover:bg-card border border-border/50 hover:border-border">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center md:flex-row">
          {/* Album Art with play overlay */}
          <div className="relative w-full md:w-16 h-16">
            <div
              className="relative h-full w-full cursor-pointer group"
              // onClick={toggleYoutubePlayer}
            >
              <Image
                src={
                  // track.youtube[0].images[0] ||
                  image ||
                  "/placeholder.svg?height=300&width=300" ||
                  "/placeholder.svg"
                }
                alt={title}
                fill
                className="object-cover rounded-md"
              />
              {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                {showYoutubePlayer ? (
                  <Pause className="h-12 w-12 text-white" />
                ) : (
                  <Play className="h-12 w-12 text-white" />
                )}
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-xl">{title}</h3>
              {collectionIds.length > 0 && (
                <Badge className="bg-accent text-accent-foreground flex items-center gap-1">
                  <Check className="h-3 w-3" /> In Collection
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Add to Collection</DropdownMenuItem>
                  {collectionIds.length > 0 && (
                    <DropdownMenuItem>Remove from Collections</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 mt-0.5 font-semibold">
            <p className="text-sm text-muted-foreground">{artist}</p>
            <p className="text-sm text-muted-foreground">-</p>
            <p className="text-sm text-muted-foreground">{"2m 30s"}</p>
          </div>
          <div className="mt-2">
            {collectionIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1 md:mt-0">
                {collectionIds.map((collection) => (
                  <Badge
                    key={collection}
                    className={cn(
                      "text-xs font-normal text-accent-foreground cursor-pointer",
                      true ? "bg-accent" : ""
                    )}
                  >
                    {collection}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
