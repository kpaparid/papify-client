import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Trash2 } from "lucide-react";
import Image from "next/image";
import { YoutubeTrack } from "../spotify/types";

export function TrackItem({
  query,
  spotifyId,
  youtubeId,
  images,
  collectionIds,
}: YoutubeTrack) {
  // const removeGoogleDriveTrack = removeGoogleDriveTrackAction.bind(null, id)
  return (
    <div className="group relative rounded-xl bg-card border-accent border p-3 transition-all hover:bg-card">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center md:flex-row">
          <div className="relative w-full md:w-16 h-16">
            <div className="relative h-full w-full cursor-pointer group">
              <Image
                src={images[0]}
                alt={query}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <h3 className="font-medium text-xl">{query.split(" - ")[0]}</h3>
              {typeof collectionIds !== "undefined" && (
                <Badge className="bg-[#183D3D] text-accent-foreground flex items-center gap-1">
                  <Check className="h-3 w-3" /> In Collection
                </Badge>
              )}
            </div>
            {/* <div className='flex items-center gap-1'>
              <form action={removeGoogleDriveTrack}>
                <Button
                  type='submit'
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </form>
            </div> */}
          </div>
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 mt-0.5 font-semibold">
            <p className="text-sm text-muted-foreground">
              {query.split(" - ")[1]}
            </p>
            <p className="text-sm text-muted-foreground">-</p>
            <p className="text-sm text-muted-foreground">{youtubeId}</p>
          </div>
          <div className="mt-2">
            {collectionIds && collectionIds.length > 0 && (
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
